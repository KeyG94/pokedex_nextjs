import LoginForm from "../../components/LoginForm";
import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";

export default function Login() {
  return (
    <Layout>
      <Head title="Login" />
      <h1>Login</h1>
      <LoginForm />
    </Layout>
  );
}
