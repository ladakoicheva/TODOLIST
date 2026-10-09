import { Formik, Form, Field, ErrorMessage } from "formik";
import style from '../Modal/Modal.module.css';
import Button from "../Button/Button";
import schema from "./schema";
import { registerUser } from "../../api/users";
import type { userI } from "../../context/type";

type Props = {
  changeUserData: (user: userI) => void;
  closeModal: () => void;
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm({ changeUserData, closeModal }: Props) {

  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const register = async (values: FormValues,{ resetForm }: { resetForm: () => void }) => {
    const res = await registerUser(values);
    if (!res.ok) return;
    localStorage.setItem('token', res.data.token);
    changeUserData(res.data as userI);
    resetForm ()
    closeModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={register}
    >
      {({ handleSubmit }) => (
        <Form>
          <label htmlFor="email">Email</label>
          <div className={style.modalItem}>
            <Field id="email" type="email" name="email" placeholder="Email" />
          </div>
          <div className={style.errors}>
            <ErrorMessage name="email" />
          </div>

          <label htmlFor="password">Password</label>
          <div className={style.modalItem}>
            <Field id="password" type="password" name="password" placeholder="Password" />
          </div>
          <div className={style.errors}>
            <ErrorMessage name="password" />
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={style.modalItem}>
            <Field id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm" />
          </div>
          <div className={style.errors}>
            <ErrorMessage name="confirmPassword" />
          </div>

      
          <Button
            onClick={handleSubmit}
            text="Sign Up"
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}