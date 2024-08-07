// This file is auto-generated by @hey-api/openapi-ts

export const $Category = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        text: {
            type: 'string',
            title: 'Category',
            maxLength: 150
        },
        slug: {
            type: 'string',
            nullable: true,
            maxLength: 50,
            pattern: '^[-a-zA-Z0-9_]+$'
        }
    },
    required: ['id', 'text']
} as const;

export const $CreateLocation = {
    type: 'object',
    properties: {
        location: {
            type: 'string',
            maxLength: 200
        },
        location_type: {
            type: 'string',
            maxLength: 200
        }
    },
    required: ['location', 'location_type']
} as const;

export const $CreateMultipleLocations = {
    type: 'object',
    properties: {
        locations: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/CreateLocation'
            }
        }
    },
    required: ['locations']
} as const;

export const $CreateMultipleTags = {
    type: 'object',
    properties: {
        tags: {
            type: 'array',
            items: {
                type: 'string',
                maxLength: 150
            }
        }
    },
    required: ['tags']
} as const;

export const $CustomUserDetails = {
    type: 'object',
    description: 'User model w/o password',
    properties: {
        pk: {
            type: 'integer',
            readOnly: true,
            title: 'ID'
        },
        is_staff: {
            type: 'boolean',
            title: 'Staff status',
            description: 'Designates whether the user can log into this admin site.'
        },
        username: {
            type: 'string',
            description: 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
            pattern: '^[\\w.@+-]+$',
            maxLength: 150
        },
        email: {
            type: 'string',
            format: 'email',
            readOnly: true,
            title: 'Email address'
        },
        first_name: {
            type: 'string',
            maxLength: 150
        },
        last_name: {
            type: 'string',
            maxLength: 150
        }
    },
    required: ['email', 'pk', 'username']
} as const;

export const $JWT = {
    type: 'object',
    description: 'Serializer for JWT authentication.',
    properties: {
        access: {
            type: 'string'
        },
        refresh: {
            type: 'string'
        },
        user: {
            '$ref': '#/components/schemas/CustomUserDetails'
        }
    },
    required: ['access', 'refresh', 'user']
} as const;

export const $Job = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        created_at: {
            type: 'string',
            format: 'date-time',
            readOnly: true
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
            readOnly: true
        },
        company_name: {
            type: 'string',
            maxLength: 150
        },
        title: {
            type: 'string',
            maxLength: 150
        },
        slug: {
            type: 'string',
            nullable: true,
            maxLength: 50,
            pattern: '^[-a-zA-Z0-9_]+$'
        },
        description: {
            type: 'string'
        },
        remote: {
            type: 'boolean'
        },
        apply_url: {
            type: 'string',
            format: 'uri',
            nullable: true,
            maxLength: 200
        },
        apply_by_email: {
            type: 'boolean'
        },
        apply_email: {
            type: 'string',
            format: 'email',
            nullable: true,
            title: 'Apply E-mail',
            maxLength: 254
        },
        company_email: {
            type: 'string',
            format: 'email',
            title: 'Company Email (For Invoice)',
            maxLength: 254
        },
        pin_on_top: {
            type: 'boolean',
            title: 'Pin on top (30 days)'
        },
        verified: {
            type: 'boolean'
        },
        user: {
            type: 'integer',
            nullable: true
        },
        tags: {
            type: 'array',
            items: {
                type: 'integer'
            }
        },
        location: {
            type: 'array',
            items: {
                type: 'integer'
            }
        },
        category: {
            type: 'array',
            items: {
                type: 'integer'
            }
        }
    },
    required: ['category', 'company_email', 'company_name', 'created_at', 'description', 'id', 'location', 'tags', 'title', 'updated_at']
} as const;

export const $Location = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        location: {
            type: 'string',
            maxLength: 200
        },
        location_type: {
            '$ref': '#/components/schemas/LocationTypeEnum'
        },
        rank: {
            type: 'integer',
            maximum: 9223372036854776000,
            minimum: 0,
            format: 'int64',
            nullable: true
        }
    },
    required: ['id', 'location', 'location_type']
} as const;

export const $LocationID = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $LocationTypeEnum = {
    enum: ['region', 'country', 'city'],
    type: 'string',
    description: `* \`region\` - Region
* \`country\` - Country
* \`city\` - City`
} as const;

export const $Login = {
    type: 'object',
    properties: {
        username: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        }
    },
    required: ['password']
} as const;

export const $PatchedCategory = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        text: {
            type: 'string',
            title: 'Category',
            maxLength: 150
        },
        slug: {
            type: 'string',
            nullable: true,
            maxLength: 50,
            pattern: '^[-a-zA-Z0-9_]+$'
        }
    }
} as const;

export const $PatchedCustomUserDetails = {
    type: 'object',
    description: 'User model w/o password',
    properties: {
        pk: {
            type: 'integer',
            readOnly: true,
            title: 'ID'
        },
        is_staff: {
            type: 'boolean',
            title: 'Staff status',
            description: 'Designates whether the user can log into this admin site.'
        },
        username: {
            type: 'string',
            description: 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
            pattern: '^[\\w.@+-]+$',
            maxLength: 150
        },
        email: {
            type: 'string',
            format: 'email',
            readOnly: true,
            title: 'Email address'
        },
        first_name: {
            type: 'string',
            maxLength: 150
        },
        last_name: {
            type: 'string',
            maxLength: 150
        }
    }
} as const;

export const $PatchedJob = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        created_at: {
            type: 'string',
            format: 'date-time',
            readOnly: true
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
            readOnly: true
        },
        company_name: {
            type: 'string',
            maxLength: 150
        },
        title: {
            type: 'string',
            maxLength: 150
        },
        slug: {
            type: 'string',
            nullable: true,
            maxLength: 50,
            pattern: '^[-a-zA-Z0-9_]+$'
        },
        description: {
            type: 'string'
        },
        remote: {
            type: 'boolean'
        },
        apply_url: {
            type: 'string',
            format: 'uri',
            nullable: true,
            maxLength: 200
        },
        apply_by_email: {
            type: 'boolean'
        },
        apply_email: {
            type: 'string',
            format: 'email',
            nullable: true,
            title: 'Apply E-mail',
            maxLength: 254
        },
        company_email: {
            type: 'string',
            format: 'email',
            title: 'Company Email (For Invoice)',
            maxLength: 254
        },
        pin_on_top: {
            type: 'boolean',
            title: 'Pin on top (30 days)'
        },
        verified: {
            type: 'boolean'
        },
        user: {
            type: 'integer',
            nullable: true
        },
        tags: {
            type: 'array',
            items: {
                type: 'integer'
            }
        },
        location: {
            type: 'array',
            items: {
                type: 'integer'
            }
        },
        category: {
            type: 'array',
            items: {
                type: 'integer'
            }
        }
    }
} as const;

export const $PatchedLocation = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        location: {
            type: 'string',
            maxLength: 200
        },
        location_type: {
            '$ref': '#/components/schemas/LocationTypeEnum'
        },
        rank: {
            type: 'integer',
            maximum: 9223372036854776000,
            minimum: 0,
            format: 'int64',
            nullable: true
        }
    }
} as const;

export const $PatchedTag = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        text: {
            type: 'string',
            title: 'Tag',
            maxLength: 150
        }
    }
} as const;

export const $Register = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            maxLength: 150,
            minLength: 1
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password1: {
            type: 'string',
            writeOnly: true
        },
        password2: {
            type: 'string',
            writeOnly: true
        }
    },
    required: ['email', 'password1', 'password2', 'username']
} as const;

export const $RestAuthDetail = {
    type: 'object',
    properties: {
        detail: {
            type: 'string',
            readOnly: true
        }
    },
    required: ['detail']
} as const;

export const $SocialLogin = {
    type: 'object',
    properties: {
        access_token: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        id_token: {
            type: 'string'
        }
    }
} as const;

export const $Subscribe = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        }
    },
    required: ['email']
} as const;

export const $Tag = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            readOnly: true
        },
        text: {
            type: 'string',
            title: 'Tag',
            maxLength: 150
        }
    },
    required: ['id', 'text']
} as const;

export const $TagID = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
} as const;

export const $TokenRefresh = {
    type: 'object',
    properties: {
        access: {
            type: 'string',
            readOnly: true
        },
        refresh: {
            type: 'string',
            writeOnly: true
        }
    },
    required: ['access', 'refresh']
} as const;

export const $TokenVerify = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            writeOnly: true
        }
    },
    required: ['token']
} as const;

export const $VerifyEmail = {
    type: 'object',
    properties: {
        key: {
            type: 'string',
            writeOnly: true
        }
    },
    required: ['key']
} as const;