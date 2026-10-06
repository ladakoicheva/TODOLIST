import { useFormik } from "formik"
import style from '../Modal/Modal.module.css'
import Button from "../Button/Button"
import schema from "./schema";

export default function SignInForm() {

  const formik = useFormik({
  validationSchema:schema,
  initialValues: {
      password:'',
      email: '',
      confirmPassword: '',
      
  },
  
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

  return (
    <form >
      <label htmlFor="email">Email</label>
      <div className={style.modalItem}>
        <input type="text"
          placeholder='Email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
      </div>
       <div className={style.errors}>
          {formik.touched.email&& formik.errors.email}
      </div>
      
        <label htmlFor="password">Password</label>
      <div className={style.modalItem}>
        <input
          type="password"
          placeholder='Password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
     
      
      </div>
       <div className={style.errors}>
          {formik.touched.password && formik.errors.password}
        </div>
      <Button onClick={formik.handleSubmit} text='Sign In' isAsync={true}  />
    </form>
     
  )
}