import React from "react";
import { Layout } from "../../layouts/Layout";
import { Link } from "react-router-dom";

import loginImg from "../../assets/img/others/login.jpg";

export const Signin = () => {
  return (
    <Layout breadcrumbTitle={"Signin"} breadcrumbSubtitle={"Signin"}>
      <section>
        <div class="td_height_120 td_height_lg_80" />
        <div class="container">
          <div class="row td_gap_y_40">
            <div class="col-lg-6">
              <div class="td_form_card td_style_1 td_radius_10 td_gray_bg_5">
                <div class="td_form_card_in">
                  <h2 class="td_fs_36 td_mb_20">SIGN IN</h2>
                  <hr />
                  <div class="td_height_30 td_height_lg_30" />
                  <input
                    type="text"
                    class="td_form_field td_mb_30 td_medium td_white_bg"
                    placeholder="Email *"
                  />
                  <input
                    type="password"
                    class="td_form_field td_mb_10 td_medium td_white_bg"
                    placeholder="Password *"
                  />
                  <div class="td_form_card_text_2 td_mb_50">
                    <div>
                      <Link
                        to="/forgot-password"
                        class="td_semibold td_accent_color"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div class="td_accent_color">
                      <div class="td_custom_checkbox">
                        <input type="checkbox" id="remember" />
                        <label for="remember">Remember me</label>
                      </div>
                    </div>
                  </div>
                  <div class="td_form_card_bottom td_mb_25">
                    <button
                      type="submit"
                      class="td_btn td_style_1 td_radius_10 td_medium"
                    >
                      <span class="td_btn_in td_white_color td_accent_bg">
                        <span>Sign In</span>
                      </span>
                    </button>
                    <p class="td_fs_20 mb-0 td_medium td_heading_color">
                      or sign up with
                    </p>
                    <div class="td_form_social td_fs_20">
                      <a href="#" class="td_center">
                        <i class="fa-brands fa-apple"></i>
                      </a>
                      <a href="#" class="td_center">
                        <i class="fa-brands fa-google"></i>
                      </a>
                      <a href="#" class="td_center">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                  <p class="td_form_card_text td_fs_20 td_medium td_heading_color mb-0">
                    Don't Have an Account? <Link to="/signup">Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="td_sign_thumb">
                <img src={loginImg} alt="Login" class="w-100 td_radius_10" />
              </div>
            </div>
          </div>
        </div>
        <div class="td_height_120 td_height_lg_80" />
      </section>
    </Layout>
  );
};
