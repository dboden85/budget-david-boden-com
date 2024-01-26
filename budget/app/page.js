import Image from "next/image";
import './style.scss';
import Login from './components/forms/Login';

export default function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}
