// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { AuthGoogleCreateData, AuthGoogleCreateResponse, AuthLoginCreateData, AuthLoginCreateResponse, AuthLogoutCreateResponse, AuthRegisterCreateData, AuthRegisterCreateResponse, AuthRegisterVerifyEmailCreateData, AuthRegisterVerifyEmailCreateResponse, AuthTokenRefreshCreateData, AuthTokenRefreshCreateResponse, AuthTokenVerifyCreateData, AuthTokenVerifyCreateResponse, AuthUserRetrieveResponse, AuthUserUpdateData, AuthUserUpdateResponse, AuthUserPartialUpdateData, AuthUserPartialUpdateResponse, CategoriesListResponse, CategoriesCreateData, CategoriesCreateResponse, CategoriesRetrieveData, CategoriesRetrieveResponse, CategoriesUpdateData, CategoriesUpdateResponse, CategoriesPartialUpdateData, CategoriesPartialUpdateResponse, CategoriesDestroyData, CategoriesDestroyResponse, JobsListResponse, JobsCreateData, JobsCreateResponse, JobsRetrieveData, JobsRetrieveResponse, JobsUpdateData, JobsUpdateResponse, JobsPartialUpdateData, JobsPartialUpdateResponse, JobsDestroyData, JobsDestroyResponse, LocationsListResponse, LocationsCreateData, LocationsCreateResponse, LocationsRetrieveData, LocationsRetrieveResponse, LocationsUpdateData, LocationsUpdateResponse, LocationsPartialUpdateData, LocationsPartialUpdateResponse, LocationsDestroyData, LocationsDestroyResponse, LocationsCreateLocationsCreateData, LocationsCreateLocationsCreateResponse, SubscriptionsSubscribeCreateData, SubscriptionsSubscribeCreateResponse, TagsListResponse, TagsCreateData, TagsCreateResponse, TagsRetrieveData, TagsRetrieveResponse, TagsUpdateData, TagsUpdateResponse, TagsPartialUpdateData, TagsPartialUpdateResponse, TagsDestroyData, TagsDestroyResponse, TagsCreateTagsCreateData, TagsCreateTagsCreateResponse } from './types.gen';

/**
 * class used for social authentications
 * example usage for facebook with access_token
 * -------------
 * from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
 *
 * class FacebookLogin(SocialLoginView):
 * adapter_class = FacebookOAuth2Adapter
 * -------------
 *
 * example usage for facebook with code
 *
 * -------------
 * from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
 * from allauth.socialaccount.providers.oauth2.client import OAuth2Client
 *
 * class FacebookLogin(SocialLoginView):
 * adapter_class = FacebookOAuth2Adapter
 * client_class = OAuth2Client
 * callback_url = 'localhost:8000'
 * -------------
 * @param data The data for the request.
 * @param data.requestBody
 * @returns SocialLogin
 * @throws ApiError
 */
export const authGoogleCreate = (data: AuthGoogleCreateData = {}): CancelablePromise<AuthGoogleCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/google/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Check the credentials and return the REST Token
 * if the credentials are valid and authenticated.
 * Calls Django Auth login method to register User ID
 * in Django session framework
 *
 * Accept the following POST parameters: username, password
 * Return the REST Framework Token Object's key.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns JWT
 * @throws ApiError
 */
export const authLoginCreate = (data: AuthLoginCreateData): CancelablePromise<AuthLoginCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/login/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Calls Django logout method and delete the Token object
 * assigned to the current User object.
 *
 * Accepts/Returns nothing.
 * @returns RestAuthDetail
 * @throws ApiError
 */
export const authLogoutCreate = (): CancelablePromise<AuthLogoutCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/logout/'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns JWT
 * @throws ApiError
 */
export const authRegisterCreate = (data: AuthRegisterCreateData): CancelablePromise<AuthRegisterCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/register/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns RestAuthDetail
 * @throws ApiError
 */
export const authRegisterVerifyEmailCreate = (data: AuthRegisterVerifyEmailCreateData): CancelablePromise<AuthRegisterVerifyEmailCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/register/verify-email',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Takes a refresh type JSON web token and returns an access type JSON web
 * token if the refresh token is valid.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns TokenRefresh
 * @throws ApiError
 */
export const authTokenRefreshCreate = (data: AuthTokenRefreshCreateData): CancelablePromise<AuthTokenRefreshCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/token/refresh/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Takes a token and indicates if it is valid.  This view provides no
 * information about a token's fitness for a particular use.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns TokenVerify
 * @throws ApiError
 */
export const authTokenVerifyCreate = (data: AuthTokenVerifyCreateData): CancelablePromise<AuthTokenVerifyCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/auth/token/verify/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Reads and updates UserModel fields
 * Accepts GET, PUT, PATCH methods.
 *
 * Default accepted fields: username, first_name, last_name
 * Default display fields: pk, username, email, first_name, last_name
 * Read-only fields: pk, email
 *
 * Returns UserModel fields.
 * @returns CustomUserDetails
 * @throws ApiError
 */
export const authUserRetrieve = (): CancelablePromise<AuthUserRetrieveResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/auth/user/'
}); };

/**
 * Reads and updates UserModel fields
 * Accepts GET, PUT, PATCH methods.
 *
 * Default accepted fields: username, first_name, last_name
 * Default display fields: pk, username, email, first_name, last_name
 * Read-only fields: pk, email
 *
 * Returns UserModel fields.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns CustomUserDetails
 * @throws ApiError
 */
export const authUserUpdate = (data: AuthUserUpdateData): CancelablePromise<AuthUserUpdateResponse> => { return __request(OpenAPI, {
    method: 'PUT',
    url: '/api/auth/user/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Reads and updates UserModel fields
 * Accepts GET, PUT, PATCH methods.
 *
 * Default accepted fields: username, first_name, last_name
 * Default display fields: pk, username, email, first_name, last_name
 * Read-only fields: pk, email
 *
 * Returns UserModel fields.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns CustomUserDetails
 * @throws ApiError
 */
export const authUserPartialUpdate = (data: AuthUserPartialUpdateData = {}): CancelablePromise<AuthUserPartialUpdateResponse> => { return __request(OpenAPI, {
    method: 'PATCH',
    url: '/api/auth/user/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @returns Category
 * @throws ApiError
 */
export const categoriesList = (): CancelablePromise<CategoriesListResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/categories/'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Category
 * @throws ApiError
 */
export const categoriesCreate = (data: CategoriesCreateData): CancelablePromise<CategoriesCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/categories/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this category.
 * @returns Category
 * @throws ApiError
 */
export const categoriesRetrieve = (data: CategoriesRetrieveData): CancelablePromise<CategoriesRetrieveResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/categories/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this category.
 * @param data.requestBody
 * @returns Category
 * @throws ApiError
 */
export const categoriesUpdate = (data: CategoriesUpdateData): CancelablePromise<CategoriesUpdateResponse> => { return __request(OpenAPI, {
    method: 'PUT',
    url: '/api/categories/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this category.
 * @param data.requestBody
 * @returns Category
 * @throws ApiError
 */
export const categoriesPartialUpdate = (data: CategoriesPartialUpdateData): CancelablePromise<CategoriesPartialUpdateResponse> => { return __request(OpenAPI, {
    method: 'PATCH',
    url: '/api/categories/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this category.
 * @returns void No response body
 * @throws ApiError
 */
export const categoriesDestroy = (data: CategoriesDestroyData): CancelablePromise<CategoriesDestroyResponse> => { return __request(OpenAPI, {
    method: 'DELETE',
    url: '/api/categories/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @returns Job
 * @throws ApiError
 */
export const jobsList = (): CancelablePromise<JobsListResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/jobs/'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Job
 * @throws ApiError
 */
export const jobsCreate = (data: JobsCreateData): CancelablePromise<JobsCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/jobs/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this job.
 * @returns Job
 * @throws ApiError
 */
export const jobsRetrieve = (data: JobsRetrieveData): CancelablePromise<JobsRetrieveResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/jobs/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this job.
 * @param data.requestBody
 * @returns Job
 * @throws ApiError
 */
export const jobsUpdate = (data: JobsUpdateData): CancelablePromise<JobsUpdateResponse> => { return __request(OpenAPI, {
    method: 'PUT',
    url: '/api/jobs/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this job.
 * @param data.requestBody
 * @returns Job
 * @throws ApiError
 */
export const jobsPartialUpdate = (data: JobsPartialUpdateData): CancelablePromise<JobsPartialUpdateResponse> => { return __request(OpenAPI, {
    method: 'PATCH',
    url: '/api/jobs/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this job.
 * @returns void No response body
 * @throws ApiError
 */
export const jobsDestroy = (data: JobsDestroyData): CancelablePromise<JobsDestroyResponse> => { return __request(OpenAPI, {
    method: 'DELETE',
    url: '/api/jobs/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @returns Location
 * @throws ApiError
 */
export const locationsList = (): CancelablePromise<LocationsListResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/locations/'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Location
 * @throws ApiError
 */
export const locationsCreate = (data: LocationsCreateData): CancelablePromise<LocationsCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/locations/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this location.
 * @returns Location
 * @throws ApiError
 */
export const locationsRetrieve = (data: LocationsRetrieveData): CancelablePromise<LocationsRetrieveResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/locations/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this location.
 * @param data.requestBody
 * @returns Location
 * @throws ApiError
 */
export const locationsUpdate = (data: LocationsUpdateData): CancelablePromise<LocationsUpdateResponse> => { return __request(OpenAPI, {
    method: 'PUT',
    url: '/api/locations/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this location.
 * @param data.requestBody
 * @returns Location
 * @throws ApiError
 */
export const locationsPartialUpdate = (data: LocationsPartialUpdateData): CancelablePromise<LocationsPartialUpdateResponse> => { return __request(OpenAPI, {
    method: 'PATCH',
    url: '/api/locations/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this location.
 * @returns void No response body
 * @throws ApiError
 */
export const locationsDestroy = (data: LocationsDestroyData): CancelablePromise<LocationsDestroyResponse> => { return __request(OpenAPI, {
    method: 'DELETE',
    url: '/api/locations/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * Create multiple locations if they don't exist, or retrieve their IDs if they do.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns LocationID
 * @throws ApiError
 */
export const locationsCreateLocationsCreate = (data: LocationsCreateLocationsCreateData): CancelablePromise<LocationsCreateLocationsCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/locations/create_locations/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * Subscribe to mailing list
 * Subscribe to the mailing list with an email address.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown
 * @throws ApiError
 */
export const subscriptionsSubscribeCreate = (data: SubscriptionsSubscribeCreateData): CancelablePromise<SubscriptionsSubscribeCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/subscriptions/subscribe/',
    body: data.requestBody,
    mediaType: 'application/json',
    errors: {
        400: ''
    }
}); };

/**
 * @returns Tag
 * @throws ApiError
 */
export const tagsList = (): CancelablePromise<TagsListResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/tags/'
}); };

/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Tag
 * @throws ApiError
 */
export const tagsCreate = (data: TagsCreateData): CancelablePromise<TagsCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/tags/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this tag.
 * @returns Tag
 * @throws ApiError
 */
export const tagsRetrieve = (data: TagsRetrieveData): CancelablePromise<TagsRetrieveResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/api/tags/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this tag.
 * @param data.requestBody
 * @returns Tag
 * @throws ApiError
 */
export const tagsUpdate = (data: TagsUpdateData): CancelablePromise<TagsUpdateResponse> => { return __request(OpenAPI, {
    method: 'PUT',
    url: '/api/tags/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this tag.
 * @param data.requestBody
 * @returns Tag
 * @throws ApiError
 */
export const tagsPartialUpdate = (data: TagsPartialUpdateData): CancelablePromise<TagsPartialUpdateResponse> => { return __request(OpenAPI, {
    method: 'PATCH',
    url: '/api/tags/{id}/',
    path: {
        id: data.id
    },
    body: data.requestBody,
    mediaType: 'application/json'
}); };

/**
 * @param data The data for the request.
 * @param data.id A unique integer value identifying this tag.
 * @returns void No response body
 * @throws ApiError
 */
export const tagsDestroy = (data: TagsDestroyData): CancelablePromise<TagsDestroyResponse> => { return __request(OpenAPI, {
    method: 'DELETE',
    url: '/api/tags/{id}/',
    path: {
        id: data.id
    }
}); };

/**
 * Create multiple tags if they don't exist, or retrieve their IDs if they do.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns TagID
 * @throws ApiError
 */
export const tagsCreateTagsCreate = (data: TagsCreateTagsCreateData): CancelablePromise<TagsCreateTagsCreateResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/api/tags/create_tags/',
    body: data.requestBody,
    mediaType: 'application/json'
}); };