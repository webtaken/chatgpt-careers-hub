// This file is auto-generated by @hey-api/openapi-ts

export type Category = {
    readonly id: number;
    text: string;
    slug?: string | null;
};

export type CreateLocation = {
    location: string;
    location_type: string;
};

export type CreateMultipleLocations = {
    locations: Array<CreateLocation>;
};

export type CreateMultipleTags = {
    tags: Array<(string)>;
};

/**
 * User model w/o password
 */
export type CustomUserDetails = {
    readonly pk: number;
    /**
     * Designates whether the user can log into this admin site.
     */
    is_staff?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    readonly email: string;
    first_name?: string;
    last_name?: string;
};

/**
 * Serializer for JWT authentication.
 */
export type JWT = {
    access: string;
    refresh: string;
    user: CustomUserDetails;
};

export type Job = {
    readonly id: number;
    readonly created_at: string;
    readonly updated_at: string;
    company_name: string;
    title: string;
    slug?: string | null;
    description: string;
    remote?: boolean;
    apply_url?: string | null;
    apply_by_email?: boolean;
    apply_email?: string | null;
    company_email: string;
    pin_on_top?: boolean;
    verified?: boolean;
    user?: number | null;
    tags: Array<(number)>;
    location: Array<(number)>;
    category: Array<(number)>;
};

export type Location = {
    readonly id: number;
    location: string;
    location_type: LocationTypeEnum;
    rank?: number | null;
};

export type LocationID = {
    id: number;
};

/**
 * * `region` - Region
 * * `country` - Country
 * * `city` - City
 */
export type LocationTypeEnum = 'region' | 'country' | 'city';

export type Login = {
    username?: string;
    email?: string;
    password: string;
};

export type PatchedCategory = {
    readonly id?: number;
    text?: string;
    slug?: string | null;
};

/**
 * User model w/o password
 */
export type PatchedCustomUserDetails = {
    readonly pk?: number;
    /**
     * Designates whether the user can log into this admin site.
     */
    is_staff?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username?: string;
    readonly email?: string;
    first_name?: string;
    last_name?: string;
};

export type PatchedJob = {
    readonly id?: number;
    readonly created_at?: string;
    readonly updated_at?: string;
    company_name?: string;
    title?: string;
    slug?: string | null;
    description?: string;
    remote?: boolean;
    apply_url?: string | null;
    apply_by_email?: boolean;
    apply_email?: string | null;
    company_email?: string;
    pin_on_top?: boolean;
    verified?: boolean;
    user?: number | null;
    tags?: Array<(number)>;
    location?: Array<(number)>;
    category?: Array<(number)>;
};

export type PatchedLocation = {
    readonly id?: number;
    location?: string;
    location_type?: LocationTypeEnum;
    rank?: number | null;
};

export type PatchedTag = {
    readonly id?: number;
    text?: string;
};

export type Register = {
    username: string;
    email: string;
    password1: string;
    password2: string;
};

export type RestAuthDetail = {
    readonly detail: string;
};

export type SocialLogin = {
    access_token?: string;
    code?: string;
    id_token?: string;
};

export type Subscribe = {
    email: string;
};

export type Tag = {
    readonly id: number;
    text: string;
};

export type TagID = {
    id: number;
};

export type TokenRefresh = {
    readonly access: string;
    refresh: string;
};

export type TokenVerify = {
    token: string;
};

export type VerifyEmail = {
    key: string;
};

export type AuthGoogleCreateData = {
    requestBody?: SocialLogin;
};

export type AuthGoogleCreateResponse = SocialLogin;

export type AuthLoginCreateData = {
    requestBody: Login;
};

export type AuthLoginCreateResponse = JWT;

export type AuthLogoutCreateResponse = RestAuthDetail;

export type AuthRegisterCreateData = {
    requestBody: Register;
};

export type AuthRegisterCreateResponse = JWT;

export type AuthRegisterVerifyEmailCreateData = {
    requestBody: VerifyEmail;
};

export type AuthRegisterVerifyEmailCreateResponse = RestAuthDetail;

export type AuthTokenRefreshCreateData = {
    requestBody: TokenRefresh;
};

export type AuthTokenRefreshCreateResponse = TokenRefresh;

export type AuthTokenVerifyCreateData = {
    requestBody: TokenVerify;
};

export type AuthTokenVerifyCreateResponse = TokenVerify;

export type AuthUserRetrieveResponse = CustomUserDetails;

export type AuthUserUpdateData = {
    requestBody: CustomUserDetails;
};

export type AuthUserUpdateResponse = CustomUserDetails;

export type AuthUserPartialUpdateData = {
    requestBody?: PatchedCustomUserDetails;
};

export type AuthUserPartialUpdateResponse = CustomUserDetails;

export type CategoriesListResponse = Array<Category>;

export type CategoriesCreateData = {
    requestBody: Category;
};

export type CategoriesCreateResponse = Category;

export type CategoriesRetrieveData = {
    /**
     * A unique integer value identifying this category.
     */
    id: number;
};

export type CategoriesRetrieveResponse = Category;

export type CategoriesUpdateData = {
    /**
     * A unique integer value identifying this category.
     */
    id: number;
    requestBody: Category;
};

export type CategoriesUpdateResponse = Category;

export type CategoriesPartialUpdateData = {
    /**
     * A unique integer value identifying this category.
     */
    id: number;
    requestBody?: PatchedCategory;
};

export type CategoriesPartialUpdateResponse = Category;

export type CategoriesDestroyData = {
    /**
     * A unique integer value identifying this category.
     */
    id: number;
};

export type CategoriesDestroyResponse = void;

export type JobsListResponse = Array<Job>;

export type JobsCreateData = {
    requestBody: Job;
};

export type JobsCreateResponse = Job;

export type JobsRetrieveData = {
    /**
     * A unique integer value identifying this job.
     */
    id: number;
};

export type JobsRetrieveResponse = Job;

export type JobsUpdateData = {
    /**
     * A unique integer value identifying this job.
     */
    id: number;
    requestBody: Job;
};

export type JobsUpdateResponse = Job;

export type JobsPartialUpdateData = {
    /**
     * A unique integer value identifying this job.
     */
    id: number;
    requestBody?: PatchedJob;
};

export type JobsPartialUpdateResponse = Job;

export type JobsDestroyData = {
    /**
     * A unique integer value identifying this job.
     */
    id: number;
};

export type JobsDestroyResponse = void;

export type LocationsListResponse = Array<Location>;

export type LocationsCreateData = {
    requestBody: Location;
};

export type LocationsCreateResponse = Location;

export type LocationsRetrieveData = {
    /**
     * A unique integer value identifying this location.
     */
    id: number;
};

export type LocationsRetrieveResponse = Location;

export type LocationsUpdateData = {
    /**
     * A unique integer value identifying this location.
     */
    id: number;
    requestBody: Location;
};

export type LocationsUpdateResponse = Location;

export type LocationsPartialUpdateData = {
    /**
     * A unique integer value identifying this location.
     */
    id: number;
    requestBody?: PatchedLocation;
};

export type LocationsPartialUpdateResponse = Location;

export type LocationsDestroyData = {
    /**
     * A unique integer value identifying this location.
     */
    id: number;
};

export type LocationsDestroyResponse = void;

export type LocationsCreateLocationsCreateData = {
    requestBody: CreateMultipleLocations;
};

export type LocationsCreateLocationsCreateResponse = Array<LocationID>;

export type SubscriptionsSubscribeCreateData = {
    requestBody: Subscribe;
};

export type SubscriptionsSubscribeCreateResponse = {
    [key: string]: unknown;
};

export type TagsListResponse = Array<Tag>;

export type TagsCreateData = {
    requestBody: Tag;
};

export type TagsCreateResponse = Tag;

export type TagsRetrieveData = {
    /**
     * A unique integer value identifying this tag.
     */
    id: number;
};

export type TagsRetrieveResponse = Tag;

export type TagsUpdateData = {
    /**
     * A unique integer value identifying this tag.
     */
    id: number;
    requestBody: Tag;
};

export type TagsUpdateResponse = Tag;

export type TagsPartialUpdateData = {
    /**
     * A unique integer value identifying this tag.
     */
    id: number;
    requestBody?: PatchedTag;
};

export type TagsPartialUpdateResponse = Tag;

export type TagsDestroyData = {
    /**
     * A unique integer value identifying this tag.
     */
    id: number;
};

export type TagsDestroyResponse = void;

export type TagsCreateTagsCreateData = {
    requestBody: CreateMultipleTags;
};

export type TagsCreateTagsCreateResponse = Array<TagID>;

export type $OpenApiTs = {
    '/api/auth/google/': {
        post: {
            req: AuthGoogleCreateData;
            res: {
                200: SocialLogin;
            };
        };
    };
    '/api/auth/login/': {
        post: {
            req: AuthLoginCreateData;
            res: {
                200: JWT;
            };
        };
    };
    '/api/auth/logout/': {
        post: {
            res: {
                200: RestAuthDetail;
            };
        };
    };
    '/api/auth/register/': {
        post: {
            req: AuthRegisterCreateData;
            res: {
                201: JWT;
            };
        };
    };
    '/api/auth/register/verify-email': {
        post: {
            req: AuthRegisterVerifyEmailCreateData;
            res: {
                200: RestAuthDetail;
            };
        };
    };
    '/api/auth/token/refresh/': {
        post: {
            req: AuthTokenRefreshCreateData;
            res: {
                200: TokenRefresh;
            };
        };
    };
    '/api/auth/token/verify/': {
        post: {
            req: AuthTokenVerifyCreateData;
            res: {
                200: TokenVerify;
            };
        };
    };
    '/api/auth/user/': {
        get: {
            res: {
                200: CustomUserDetails;
            };
        };
        put: {
            req: AuthUserUpdateData;
            res: {
                200: CustomUserDetails;
            };
        };
        patch: {
            req: AuthUserPartialUpdateData;
            res: {
                200: CustomUserDetails;
            };
        };
    };
    '/api/categories/': {
        get: {
            res: {
                200: Array<Category>;
            };
        };
        post: {
            req: CategoriesCreateData;
            res: {
                201: Category;
            };
        };
    };
    '/api/categories/{id}/': {
        get: {
            req: CategoriesRetrieveData;
            res: {
                200: Category;
            };
        };
        put: {
            req: CategoriesUpdateData;
            res: {
                200: Category;
            };
        };
        patch: {
            req: CategoriesPartialUpdateData;
            res: {
                200: Category;
            };
        };
        delete: {
            req: CategoriesDestroyData;
            res: {
                /**
                 * No response body
                 */
                204: void;
            };
        };
    };
    '/api/jobs/': {
        get: {
            res: {
                200: Array<Job>;
            };
        };
        post: {
            req: JobsCreateData;
            res: {
                201: Job;
            };
        };
    };
    '/api/jobs/{id}/': {
        get: {
            req: JobsRetrieveData;
            res: {
                200: Job;
            };
        };
        put: {
            req: JobsUpdateData;
            res: {
                200: Job;
            };
        };
        patch: {
            req: JobsPartialUpdateData;
            res: {
                200: Job;
            };
        };
        delete: {
            req: JobsDestroyData;
            res: {
                /**
                 * No response body
                 */
                204: void;
            };
        };
    };
    '/api/locations/': {
        get: {
            res: {
                200: Array<Location>;
            };
        };
        post: {
            req: LocationsCreateData;
            res: {
                201: Location;
            };
        };
    };
    '/api/locations/{id}/': {
        get: {
            req: LocationsRetrieveData;
            res: {
                200: Location;
            };
        };
        put: {
            req: LocationsUpdateData;
            res: {
                200: Location;
            };
        };
        patch: {
            req: LocationsPartialUpdateData;
            res: {
                200: Location;
            };
        };
        delete: {
            req: LocationsDestroyData;
            res: {
                /**
                 * No response body
                 */
                204: void;
            };
        };
    };
    '/api/locations/create_locations/': {
        post: {
            req: LocationsCreateLocationsCreateData;
            res: {
                201: Array<LocationID>;
            };
        };
    };
    '/api/subscriptions/subscribe/': {
        post: {
            req: SubscriptionsSubscribeCreateData;
            res: {
                200: {
                    [key: string]: unknown;
                };
                400: {
                    [key: string]: unknown;
                };
            };
        };
    };
    '/api/tags/': {
        get: {
            res: {
                200: Array<Tag>;
            };
        };
        post: {
            req: TagsCreateData;
            res: {
                201: Tag;
            };
        };
    };
    '/api/tags/{id}/': {
        get: {
            req: TagsRetrieveData;
            res: {
                200: Tag;
            };
        };
        put: {
            req: TagsUpdateData;
            res: {
                200: Tag;
            };
        };
        patch: {
            req: TagsPartialUpdateData;
            res: {
                200: Tag;
            };
        };
        delete: {
            req: TagsDestroyData;
            res: {
                /**
                 * No response body
                 */
                204: void;
            };
        };
    };
    '/api/tags/create_tags/': {
        post: {
            req: TagsCreateTagsCreateData;
            res: {
                201: Array<TagID>;
            };
        };
    };
};