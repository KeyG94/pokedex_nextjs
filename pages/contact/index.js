import ContactForm from "../../components/ContactForm";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";

export default function Contact() {
  return (
    <Layout>
      <Head title="Contact" />
      <div className="container" style={{ display: "block" }}>
        <h1>Contact</h1>
        <ContactForm />
      </div>
    </Layout>
  );
}
