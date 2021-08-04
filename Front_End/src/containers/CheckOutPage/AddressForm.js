import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddress } from "../../actions";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../components/ErrorMessage/ErrorMessages";
import "./CheckOutPage.css";

const AddressForm = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { initialData } = props;

  const initialValues = {
    name: initialData ? initialData.name : "",
    mobileNumber: initialData ? initialData.mobileNumber : "",
    pinCode: initialData ? initialData.pinCode : "",
    locality: initialData ? initialData.locality : "",
    address: initialData ? initialData.address : "",
    cityDistrictTown: initialData ? initialData.cityDistrictTown : "",
    state: initialData ? initialData.state : "",
    landmark: initialData ? initialData.landmark : "",
    alternatePhone: initialData ? initialData.alternatePhone : "",
    addressType: initialData ? initialData.addressType : "",
    id: initialData ? initialData._id : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    mobileNumber: Yup.number().required().min(10),
    pinCode: Yup.number().required(),
    locality: Yup.string().required(),
    address: Yup.string().required(),
    cityDistrictTown: Yup.string().required(),
    state: Yup.string().required(),
    landmark: Yup.string().required(), 
    alternatePhone: Yup.number().required().min(10),
    picked: Yup.string().required(),
  });
  const onSubmit = (values) => {
    const payload = {
      address: {
        name: values.name,
        mobileNumber: values.mobileNumber,
        pinCode: values.pinCode,
        locality: values.locality,
        address: values.address,
        cityDistrictTown: values.cityDistrictTown,
        state: values.state,
        landmark: values.landmark,
        alternatePhone: values.alternatePhone,
        addressType: values.picked,
      },
    };

    if (values.id) payload.address._id = values.id;
    dispatch(addAddress(payload)).then(() => {
      props.onAddressSubmit();
      dispatch(getAddress());
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form-signin mx-5">
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          name="name"
        />
        <ErrorMessage name="name" component={ErrorMessages} />

        <Field
          type="text"
          className="form-control mb-2"
          placeholder="MobileNumber"
          name="mobileNumber"
        />
        <ErrorMessage name="mobileNumber" component={ErrorMessages} />
        <Field
          type="number"
          className="form-control mb-2"
          placeholder="pinCode"
          name="pinCode"
        />
        <ErrorMessage name="pinCode" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="Locality"
          name="locality"
        />
        <ErrorMessage name="locality" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="Address"
          name="address"
        />
        <ErrorMessage name="address" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="City/ District/ Town"
          name="cityDistrictTown"
        />
        <ErrorMessage name="cityDistrictTown" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="State"
          name="state"
        />
        <ErrorMessage name="state" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="Landmark"
          name="landmark"
        />
        <ErrorMessage name="landmark" component={ErrorMessages} />
        <Field
          type="text"
          className="form-control mb-2"
          placeholder="AlternatePhone"
          name="alternatePhone"
        />
        <ErrorMessage name="alternatePhone" component={ErrorMessages} />
        <label>
          <Field type="radio" name="picked" value="home" />
          Home
        </label>
        <label>
          <Field type="radio" name="picked" value="work" />
          Work
        </label>
        <ErrorMessage name="picked" component={ErrorMessages} />

        <div>
          {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
        </div>
        <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">
          SAVE
          {/* {props.initialData ? (
            <span>Save</span>
          ) : (
            <span>SAVE AND DELIVER HERE</span>
          )} */}
        </button>
      </Form>
    </Formik>
  );
};
export default AddressForm;
