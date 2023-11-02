/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Fragment } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";

// BalAsha - Nurture example components
import DefaultNavbarCategory from "examples/Navbars/DefaultNavbar/DefaultNavbarCategory";
import DefaultNavbarMenu from "examples/Navbars/DefaultNavbar/DefaultNavbarMenu";

function PagesMenu({ routes, open, close, mobileMenu }) {
  const renderPagesMenuRoute = (routeName) =>
    routes.map(
      ({ key, name, icon, collapse }) =>
        key === routeName && (
          <Fragment key={key}>
            <DefaultNavbarCategory icon={icon} title={name} />
            {collapse.map(({ key: collapseKey, route, name: collapseName }) => (
              <MenuItem
                key={collapseKey}
                component={Link}
                to={route}
                onClick={mobileMenu ? undefined : close}
              >
                <SoftBox color="text" pl={2}>
                  {collapseName}
                </SoftBox>
              </MenuItem>
            ))}
          </Fragment>
        )
    );

  const renderMenuContent = (
    <SoftBox py={1} px={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          {renderPagesMenuRoute("dashboards")}
          <SoftBox mt={2}>{renderPagesMenuRoute("users")}</SoftBox>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
          <SoftBox display={{ xs: "none", lg: "block" }}>
            <Divider orientation="vertical" />
          </SoftBox>
          <SoftBox>
            {renderPagesMenuRoute("extra")}
            <SoftBox mt={2}>{renderPagesMenuRoute("projects")}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={5} sx={{ display: "flex" }}>
          <SoftBox display={{ xs: "none", lg: "block" }}>
            <Divider orientation="vertical" />
          </SoftBox>
          <SoftBox width="100%">
            {renderPagesMenuRoute("account")}
            <SoftBox mt={2}>{renderPagesMenuRoute("profile")}</SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );

  return mobileMenu ? (
    renderMenuContent
  ) : (
    <DefaultNavbarMenu open={open} close={close}>
      {renderMenuContent}
    </DefaultNavbarMenu>
  );
}

// Setting default values for the props of PagesMenu
PagesMenu.defaultProps = {
  mobileMenu: false,
  open: false,
  close: false,
};

// Typechecking props for the PagesMenu
PagesMenu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  mobileMenu: PropTypes.bool,
};

export default PagesMenu;
