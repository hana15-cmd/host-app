import React from "react";

export const DashboardApp = React.lazy(() => 
    import("remote_app/App"));

export const AccountingApp = React.lazy(() =>
  import("mfe_accounting_app/App")
);
export const UserManagementApp = React.lazy(() =>
  import("user_management_app/App")
);