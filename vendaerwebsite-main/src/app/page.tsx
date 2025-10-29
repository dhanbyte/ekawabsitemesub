import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Package2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center justify-center gap-2"
          >
            <Package2 className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">
              VendorVerse
            </span>
          </Link>
          <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
          <CardDescription>
            Please select your login type.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/admin/login">Admin Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Vendor Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
