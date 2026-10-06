import { useFormik } from "formik"
import style from '../Modal/Modal.module.css'
import Button from "../Button/Button"
import schema from "./schema";
import { registerUser } from "../../api/users";
import type { userI } from "../../context/type";

type props = {
  changeUserData: (user: userI) => void;
  closeModal:()=>void
}

export default function SignUpForm({changeUserData,closeModal}:props) {

  const formik = useFormik({
  validationSchema:schema,
  initialValues: {
      password:'',
      email: '',
      confirmPassword: '',
      
  },
  
     onSubmit: values => {
       register(values);
       closeModal()
     },
   });

  const register = async(formData: { confirmPassword: string, password: string, email: string }) => {
    const res = await registerUser(formData);
    if (!res.ok) return;
    changeUserData(res.data as userI);
    console.log(res.data)
  }
  
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
      
          <label htmlFor="confirmPassword">Confirm Password</label>
        <div className={style.modalItem}>
        <input
          type="password"
          placeholder='Confirm'
          name='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
     
      </div>
       <div className={style.errors}>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </div>
      <Button onClick={formik.handleSubmit} text='Sign Up' isAsync={true}  />
    </form>
     
  )
}
