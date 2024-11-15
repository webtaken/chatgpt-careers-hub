// This file is auto-generated by @hey-api/openapi-ts

export type Category = {
    readonly id: number;
    text: string;
    slug?: string | null;
};

export type CheckoutURL = {
    url: string;
};

export type CountSubscriptions = {
    count: number;
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

export type CustomRegister = {
    username: string;
    email: string;
    password1: string;
    password2: string;
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

export type CustomerPortalURL = {
    url: string;
};

export type GetCheckoutURLRequest = {
    receipt_button_text?: string;
    receipt_thank_you_note?: string;
    redirect_url: string;
    embed?: boolean;
    email: string;
    user_id: number;
    variant_id: number;
    job_id: number;
};

export type HasAccess = {
    has_access: boolean;
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
    visible?: boolean;
    user?: number | null;
    tags: Array<(number)>;
    location: Array<(number)>;
    category: Array<(number)>;
};

export type JobList = {
    readonly id: number;
    title: string;
    company_name: string;
    tags: Array<Tag>;
    verified?: boolean;
    location: Array<Location>;
    category: Array<Category>;
    slug?: string | null;
};

export type JobRetrieve = {
    readonly id: number;
    tags: Array<Tag>;
    location: Array<Location>;
    category: Array<Category>;
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
    visible?: boolean;
    user?: number | null;
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
 * * `remote` - Remote
 * * `region` - Region
 * * `country` - Country
 * * `city` - City
 */
export type LocationTypeEnum = 'remote' | 'region' | 'country' | 'city';

export type Login = {
    username?: string;
    email?: string;
    password: string;
};

export type Order = {
    readonly id: number;
    lemonsqueezy_id: string;
    order_id: number;
    order_number: number;
    name: string;
    email: string;
    status: string;
    status_formatted: string;
    refunded?: boolean;
    refunded_at: string;
    price?: string;
    receipt?: string | null;
    order_item_id?: number | null;
    user?: number | null;
    plan?: number | null;
};

export type PaginatedJobListList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<JobList>;
};

export type PaginatedLocationList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<Location>;
};

export type PaginatedTagList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<Tag>;
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
    visible?: boolean;
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

export type Plan = {
    readonly id: number;
    product_id: number;
    product_name: string;
    variant_id: number;
    category: string;
    name: string;
    description: string;
    price: string;
    is_usage_based?: boolean;
    interval: string;
    interval_count: number;
    trial_interval?: string | null;
    trial_interval_count?: number | null;
    sort: number;
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
    requestBody: CustomRegister;
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

export type BillingWebhookCreateResponse = unknown;

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

export type JobsListResponse = Array<JobList>;

export type JobsCreateData = {
    requestBody: Job;
};

export type JobsCreateResponse = Job;

export type JobsListListData = {
    category?: Array<(number)>;
    categoryText?: string;
    location?: Array<(number)>;
    locationLocation?: string;
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
    slug?: string;
    tags?: Array<(number)>;
    tagsText?: string;
    title?: string;
};

export type JobsListListResponse = PaginatedJobListList;

export type JobsRetrieveData = {
    /**
     * A unique integer value identifying this job.
     */
    id: number;
};

export type JobsRetrieveResponse = JobRetrieve;

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

export type JobsBySlugRetrieveData = {
    slug: string;
};

export type JobsBySlugRetrieveResponse = JobRetrieve;

export type LocationsListResponse = Array<Location>;

export type LocationsCreateData = {
    requestBody: Location;
};

export type LocationsCreateResponse = Location;

export type LocationsListListData = {
    location?: string;
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
};

export type LocationsListListResponse = PaginatedLocationList;

export type LocationsListBulkRetrieveCreateData = {
    location?: string;
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
    requestBody?: {
        /**
         * List of tag IDs to retrieve
         */
        ids: Array<(number)>;
    };
};

export type LocationsListBulkRetrieveCreateResponse = PaginatedLocationList;

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

export type OrderRetrieveData = {
    /**
     * A unique integer value identifying this order.
     */
    id: number;
};

export type OrderRetrieveResponse = Order;

export type OrderGetCustomerReceiptRetrieveData = {
    /**
     * A unique integer value identifying this order.
     */
    id: number;
};

export type OrderGetCustomerReceiptRetrieveResponse = CustomerPortalURL;

export type OrderGetCheckoutUrlCreateData = {
    requestBody: GetCheckoutURLRequest;
};

export type OrderGetCheckoutUrlCreateResponse = CheckoutURL;

export type OrderGetUserOrderRetrieveData = {
    /**
     * The user id requesting his subscriptions
     */
    userId: number;
};

export type OrderGetUserOrderRetrieveResponse = Order;

export type OrderUserHasAccessRetrieveResponse = HasAccess;

export type PlansListResponse = Array<Plan>;

export type PlansRetrieveData = {
    /**
     * A unique integer value identifying this plan.
     */
    id: number;
};

export type PlansRetrieveResponse = Plan;

export type SubscriptionsGetCountSubscriptionsRetrieveResponse = CountSubscriptions;

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

export type TagsListListData = {
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
    text?: string;
};

export type TagsListListResponse = PaginatedTagList;

export type TagsListBulkRetrieveCreateData = {
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
    requestBody?: {
        /**
         * List of tag IDs to retrieve
         */
        ids: Array<(number)>;
    };
    text?: string;
};

export type TagsListBulkRetrieveCreateResponse = PaginatedTagList;

export type TagsListTopTagsListData = {
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    pageSize?: number;
    text?: string;
};

export type TagsListTopTagsListResponse = PaginatedTagList;

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
    '/api/billing/webhook': {
        post: {
            res: {
                /**
                 * No response body
                 */
                200: unknown;
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
                200: Array<JobList>;
            };
        };
        post: {
            req: JobsCreateData;
            res: {
                201: Job;
            };
        };
    };
    '/api/jobs-list/': {
        get: {
            req: JobsListListData;
            res: {
                200: PaginatedJobListList;
            };
        };
    };
    '/api/jobs/{id}/': {
        get: {
            req: JobsRetrieveData;
            res: {
                200: JobRetrieve;
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
    '/api/jobs/by-slug/{slug}/': {
        get: {
            req: JobsBySlugRetrieveData;
            res: {
                200: JobRetrieve;
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
    '/api/locations-list/': {
        get: {
            req: LocationsListListData;
            res: {
                200: PaginatedLocationList;
            };
        };
    };
    '/api/locations-list/bulk-retrieve/': {
        post: {
            req: LocationsListBulkRetrieveCreateData;
            res: {
                200: PaginatedLocationList;
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
    '/api/order/{id}/': {
        get: {
            req: OrderRetrieveData;
            res: {
                200: Order;
            };
        };
    };
    '/api/order/{id}/get_customer_receipt/': {
        get: {
            req: OrderGetCustomerReceiptRetrieveData;
            res: {
                200: CustomerPortalURL;
            };
        };
    };
    '/api/order/get_checkout_url/': {
        post: {
            req: OrderGetCheckoutUrlCreateData;
            res: {
                200: CheckoutURL;
            };
        };
    };
    '/api/order/get_user_order/': {
        get: {
            req: OrderGetUserOrderRetrieveData;
            res: {
                200: Order;
            };
        };
    };
    '/api/order/user_has_access/': {
        get: {
            res: {
                200: HasAccess;
            };
        };
    };
    '/api/plans/': {
        get: {
            res: {
                200: Array<Plan>;
            };
        };
    };
    '/api/plans/{id}/': {
        get: {
            req: PlansRetrieveData;
            res: {
                200: Plan;
            };
        };
    };
    '/api/subscriptions/get_count_subscriptions/': {
        get: {
            res: {
                200: CountSubscriptions;
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
    '/api/tags-list/': {
        get: {
            req: TagsListListData;
            res: {
                200: PaginatedTagList;
            };
        };
    };
    '/api/tags-list/bulk-retrieve/': {
        post: {
            req: TagsListBulkRetrieveCreateData;
            res: {
                200: PaginatedTagList;
            };
        };
    };
    '/api/tags-list/top-tags/': {
        get: {
            req: TagsListTopTagsListData;
            res: {
                200: PaginatedTagList;
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