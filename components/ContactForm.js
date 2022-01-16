import { Formik } from "formik";
import * as yup from "yup";

//yup imported from yup using npm install yup
const reviewSchema = yup.object({
  //object keys to refer for validation
  firstname: yup.string().min(3).required("First name is required"),
  lastname: yup.string().min(4).required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup.string().min(10).required("A message is required"),
});

export default function ContactForm() {
  return (
    //imported from Formik using npm install formik; ref: https://formik.org/
    <Formik
      //initial values that is used instead of state. Formik handles state, yup uses these references for validation
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        message: "",
      }}
      //validation schema is run, if return is true it will handle onSubmit
      validationSchema={reviewSchema}
      //this is ran if validation is successful

      //onSubmit prop runs a function that takes in (values, actions). I've destructured setSubmitting and resetForm ref: https://formik.org/docs/api/formik
      onSubmit={(values, { setSubmitting, resetForm }) => {
        //this function takes in Formik childrens values.

        //Im using a setTimeout for the sake of simulating a submit as if it was submitting to an api
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
          });
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "block",
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div>
            {/* Error message for first name */}
            <p style={{ color: "red" }}>
              {errors.firstname && touched.firstname && errors.firstname}
            </p>
            {/* First Name input field */}
            <label htmlFor="firstname">First Name</label>
            <input
              type="firstname"
              name="firstname"
              label="firstname"
              placeholder="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
              style={{
                width: "100%",
                padding: 7,
                fontSize: 18,
                marginBottom: 4,
              }}
            />
          </div>
          <div>
            <p style={{ color: "red" }}>
              {errors.lastname && touched.lastname && errors.lastname}
            </p>
            {/* last name input field */}
            <label htmlFor="lastname">Last Name</label>
            <input
              type="lastname"
              name="lastname"
              label="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
              style={{
                width: "100%",
                padding: 7,
                fontSize: 18,
                marginBottom: 4,
              }}
            />
          </div>
          <div>
            {/* Error message for email */}
            <p style={{ color: "red" }}>
              {errors.email && touched.email && errors.email}
            </p>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              style={{
                width: "100%",
                padding: 7,
                fontSize: 18,
                marginBottom: 4,
              }}
            />
          </div>

          <label htmlFor="subject" style={{ marginRight: 5 }}>
            Subject
          </label>
          <div>
            <select
              type="subject"
              name="subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              style={{ padding: 7, fontSize: 18, marginBottom: 4 }}
            >
              <option value="Personal">Personal</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div>
            {/* Message input field */}
            <p style={{ color: "red" }}>
              {errors.message && touched.message && errors.message}
            </p>
            <label htmlFor="messagae">Your message</label>
            <textarea
              type="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              style={{
                width: "100%",
                height: 150,
                padding: 7,
                fontSize: 18,
                marginBottom: 4,
              }}
              placeholder="Your message here"
            />
          </div>
          <div>
            <button
              type="submit"
              //if isSubmitting is true, disable the button
              disabled={isSubmitting}
              style={{ padding: 5 }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
