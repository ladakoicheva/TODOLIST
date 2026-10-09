import { Formik, Form, Field, ErrorMessage } from "formik";
import style from '../Modal/Modal.module.css';
import Button from "../Button/Button";
import schema from "./schema";
import { login } from "../../api/users";
import type { userI } from "../../context/type";

type Props = {
  changeUserData: (user: userI) => void;
  closeModal: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

export default function SignInForm({ changeUserData ,  closeModal}: Props) {

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const logInUser = async (formData: FormValues,{ resetForm }: { resetForm: () => void }) => {
    const res = await login(formData);
    if (!res.ok) return;
    localStorage.setItem('token', res.data.token);

    changeUserData(res.data as userI);
    resetForm();
    closeModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={logInUser}
    >
      {(formikProps) => (
        <Form>
          <label htmlFor="email">Email</label>
          <div className={style.modalItem}>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={style.errors}>
            <ErrorMessage name="email" />
          </div>

          <label htmlFor="password">Password</label>
          <div className={style.modalItem}>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className={style.errors}>
            <ErrorMessage name="password" />
          </div>

          <Button
            onClick={formikProps.handleSubmit}
            text="Sign In"
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}