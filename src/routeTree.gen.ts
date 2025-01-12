/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HelloworldImport } from './routes/helloworld'
import { Route as UnauthorizedImport } from './routes/_unauthorized'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as UnauthorizedLoginImport } from './routes/_unauthorized/login'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedClassesImport } from './routes/_authenticated/classes'
import { Route as AuthenticatedFinanceIndexImport } from './routes/_authenticated/finance/index'
import { Route as AuthenticatedAnnouncementIndexImport } from './routes/_authenticated/announcement/index'
import { Route as UnauthorizedStudentActivationImport } from './routes/_unauthorized/student/activation'
import { Route as AuthenticatedStudentRecordsImport } from './routes/_authenticated/student/records'
import { Route as AuthenticatedStudentEvaluationImport } from './routes/_authenticated/student/evaluation'
import { Route as AuthenticatedFinancePaymentImport } from './routes/_authenticated/finance/payment'
import { Route as AuthenticatedFinanceLedgerImport } from './routes/_authenticated/finance/ledger'
import { Route as AuthenticatedFinanceAssessmentImport } from './routes/_authenticated/finance/assessment'

// Create/Update Routes

const HelloworldRoute = HelloworldImport.update({
  path: '/helloworld',
  getParentRoute: () => rootRoute,
} as any)

const UnauthorizedRoute = UnauthorizedImport.update({
  id: '/_unauthorized',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const UnauthorizedLoginRoute = UnauthorizedLoginImport.update({
  path: '/login',
  getParentRoute: () => UnauthorizedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedClassesRoute = AuthenticatedClassesImport.update({
  path: '/classes',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedFinanceIndexRoute = AuthenticatedFinanceIndexImport.update({
  path: '/finance/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAnnouncementIndexRoute =
  AuthenticatedAnnouncementIndexImport.update({
    path: '/announcement/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const UnauthorizedStudentActivationRoute =
  UnauthorizedStudentActivationImport.update({
    path: '/student/activation',
    getParentRoute: () => UnauthorizedRoute,
  } as any)

const AuthenticatedStudentRecordsRoute =
  AuthenticatedStudentRecordsImport.update({
    path: '/student/records',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedStudentEvaluationRoute =
  AuthenticatedStudentEvaluationImport.update({
    path: '/student/evaluation',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedFinancePaymentRoute =
  AuthenticatedFinancePaymentImport.update({
    path: '/finance/payment',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedFinanceLedgerRoute = AuthenticatedFinanceLedgerImport.update(
  {
    path: '/finance/ledger',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

const AuthenticatedFinanceAssessmentRoute =
  AuthenticatedFinanceAssessmentImport.update({
    path: '/finance/assessment',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_unauthorized': {
      id: '/_unauthorized'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthorizedImport
      parentRoute: typeof rootRoute
    }
    '/helloworld': {
      id: '/helloworld'
      path: '/helloworld'
      fullPath: '/helloworld'
      preLoaderRoute: typeof HelloworldImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/classes': {
      id: '/_authenticated/classes'
      path: '/classes'
      fullPath: '/classes'
      preLoaderRoute: typeof AuthenticatedClassesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_unauthorized/login': {
      id: '/_unauthorized/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof UnauthorizedLoginImport
      parentRoute: typeof UnauthorizedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/finance/assessment': {
      id: '/_authenticated/finance/assessment'
      path: '/finance/assessment'
      fullPath: '/finance/assessment'
      preLoaderRoute: typeof AuthenticatedFinanceAssessmentImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/finance/ledger': {
      id: '/_authenticated/finance/ledger'
      path: '/finance/ledger'
      fullPath: '/finance/ledger'
      preLoaderRoute: typeof AuthenticatedFinanceLedgerImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/finance/payment': {
      id: '/_authenticated/finance/payment'
      path: '/finance/payment'
      fullPath: '/finance/payment'
      preLoaderRoute: typeof AuthenticatedFinancePaymentImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/student/evaluation': {
      id: '/_authenticated/student/evaluation'
      path: '/student/evaluation'
      fullPath: '/student/evaluation'
      preLoaderRoute: typeof AuthenticatedStudentEvaluationImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/student/records': {
      id: '/_authenticated/student/records'
      path: '/student/records'
      fullPath: '/student/records'
      preLoaderRoute: typeof AuthenticatedStudentRecordsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_unauthorized/student/activation': {
      id: '/_unauthorized/student/activation'
      path: '/student/activation'
      fullPath: '/student/activation'
      preLoaderRoute: typeof UnauthorizedStudentActivationImport
      parentRoute: typeof UnauthorizedImport
    }
    '/_authenticated/announcement/': {
      id: '/_authenticated/announcement/'
      path: '/announcement'
      fullPath: '/announcement'
      preLoaderRoute: typeof AuthenticatedAnnouncementIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/finance/': {
      id: '/_authenticated/finance/'
      path: '/finance'
      fullPath: '/finance'
      preLoaderRoute: typeof AuthenticatedFinanceIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedClassesRoute,
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
    AuthenticatedFinanceAssessmentRoute,
    AuthenticatedFinanceLedgerRoute,
    AuthenticatedFinancePaymentRoute,
    AuthenticatedStudentEvaluationRoute,
    AuthenticatedStudentRecordsRoute,
    AuthenticatedAnnouncementIndexRoute,
    AuthenticatedFinanceIndexRoute,
  }),
  UnauthorizedRoute: UnauthorizedRoute.addChildren({
    UnauthorizedLoginRoute,
    UnauthorizedStudentActivationRoute,
  }),
  HelloworldRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_unauthorized",
        "/helloworld"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/classes",
        "/_authenticated/profile",
        "/_authenticated/",
        "/_authenticated/finance/assessment",
        "/_authenticated/finance/ledger",
        "/_authenticated/finance/payment",
        "/_authenticated/student/evaluation",
        "/_authenticated/student/records",
        "/_authenticated/announcement/",
        "/_authenticated/finance/"
      ]
    },
    "/_unauthorized": {
      "filePath": "_unauthorized.tsx",
      "children": [
        "/_unauthorized/login",
        "/_unauthorized/student/activation"
      ]
    },
    "/helloworld": {
      "filePath": "helloworld.tsx"
    },
    "/_authenticated/classes": {
      "filePath": "_authenticated/classes.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_unauthorized/login": {
      "filePath": "_unauthorized/login.tsx",
      "parent": "/_unauthorized"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/finance/assessment": {
      "filePath": "_authenticated/finance/assessment.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/finance/ledger": {
      "filePath": "_authenticated/finance/ledger.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/finance/payment": {
      "filePath": "_authenticated/finance/payment.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/student/evaluation": {
      "filePath": "_authenticated/student/evaluation.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/student/records": {
      "filePath": "_authenticated/student/records.tsx",
      "parent": "/_authenticated"
    },
    "/_unauthorized/student/activation": {
      "filePath": "_unauthorized/student/activation.tsx",
      "parent": "/_unauthorized"
    },
    "/_authenticated/announcement/": {
      "filePath": "_authenticated/announcement/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/finance/": {
      "filePath": "_authenticated/finance/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
