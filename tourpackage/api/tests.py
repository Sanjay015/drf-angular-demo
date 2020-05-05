from datetime import timedelta
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.utils import timezone
import oauth2_provider.models
from api.models import Package, PackagePermission

Application = oauth2_provider.models.get_application_model()
AccessToken = oauth2_provider.models.get_access_token_model()


def create_access_token(user):
    token_expiration_time = timezone.now() + timedelta(minutes=60)
    token = AccessToken.objects.create(
        user=user,
        scope='read write packages',
        token='test{}{}'.format(
            user.id,
            int(token_expiration_time.timestamp()),
        ),
        application=Application.objects.first(),
        expires=token_expiration_time,
    )
    return token


def auth_header(token):
    return { 'HTTP_AUTHORIZATION': 'Bearer {}'.format(token) }


class PackageViewSetTestCase(APITestCase):
    def test_only_logged_in_users_can_view_packages(self):
        response = self.client.get('/api/v1/packages/')
        self.assertEqual(response.status_code, 401)

        user = User.objects.create(username='user')
        token = create_access_token(user)
        response = self.client.get(
            '/api/v1/packages/', **auth_header(token)
        )
        self.assertEqual(response.status_code, 200)

        token.scope = 'packages'
        token.save()
        response = self.client.get(
            '/api/v1/packages/', **auth_header(token)
        )
        self.assertEqual(response.status_code, 403)


class PackagePermissionTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='user')
        self.auth_user = auth_header(create_access_token(self.user))
        self.package = Package.objects.create(category='a', name='package', price=0.0, rating='medium', tour_length=1)
        self.other_user = User.objects.create(username='other_user')
        self.auth_other_user = auth_header(create_access_token(self.other_user))
        self.other_package = Package.objects.create(category='a', name='other_package', price=1.0, rating='medium', tour_length=1)
        PackagePermission.set_can_write(self.user, self.package)
        PackagePermission.set_can_write(self.other_user, self.other_package)

    def test_user_cannot_write_other_users_packages(self):
        self.assertTrue(PackagePermission.can_write(self.user, self.package))
        self.assertFalse(PackagePermission.can_write(self.user, self.other_package))

    def test_user_cannot_access_other_users_packages(self):
        response = self.client.get(
            '/api/v1/packages/{}/'.format(self.package.id),
            **self.auth_user
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.package.id)
        self.assertCountEqual(
            response.data.keys(),
            [
                'id', 'category', 'name', 'promo', 'price',
                'tour_length', 'rating', 'start'
            ]
        )

        response = self.client.get(
            '/api/v1/packages/{}/'.format(self.other_package.id),
            **self.auth_user
        )
        self.assertEqual(response.status_code, 404)

        response = self.client.get(
            '/api/v1/packages/{}/'.format(self.other_package.id),
            **self.auth_other_user
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.other_package.id)


class ValidationTestCase(APITestCase):
    def test_invalid_start_date_returns_error(self):
        user = User.objects.create(username='user')
        auth = auth_header(create_access_token(user))
        data = {
            'category': 'tour',
            'name': 'Example',
            'promo': 'promo',
            'price': 12.34,
            'tour_length': 1,
            'rating': 'easy',
            'start': '01/01/2019',
        }
        response = self.client.post('/api/v1/packages/', data, **auth)
        self.assertEqual(response.status_code, 400)
        self.assertRegex(response.data['start'][0], 'wrong format')

        data['start'] = '2019-01-01'
        response = self.client.post('/api/v1/packages/', data, **auth)
        self.assertEqual(response.status_code, 201)
