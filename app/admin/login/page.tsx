import { login } from './actions';
import LoginForm from '@/components/admin/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const params = await searchParams;
  return <LoginForm loginAction={login} redirectTo={params.redirectTo || '/admin'} />;
}
