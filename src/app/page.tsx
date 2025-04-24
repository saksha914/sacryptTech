import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <TechStack />
      <Contact />
    </Layout>
  );
}
