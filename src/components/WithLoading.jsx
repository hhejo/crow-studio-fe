import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";

import api from "../api/api";
import { startLoading, endLoading } from "../redux/globalSlice";

const WithLoading = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.value.isLoading);

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        dispatch(startLoading());
        return config;
      },
      (err) => {
        dispatch(endLoading());
        return Promise.reject(err);
      }
    );
    api.interceptors.response.use(
      (config) => {
        dispatch(endLoading());
        return config;
      },
      (err) => {
        dispatch(endLoading());
        return Promise.reject(err);
      }
    );
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {children}
    </React.Fragment>
  );
};

export default WithLoading;
