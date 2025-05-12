import type { GitHubUser } from '@/types/auth-types';
import Image from 'next/image';

type Props = GitHubUser;
export default function User({ name, image }: Props) {
  return (
    <div>
      Angemeldet als {name}
      {image && (
        <Image
          src={image}
          width={64}
          height={64}
          alt={`GitHub-Avatar von ${name}`}
        />
      )}
    </div>
  );
}
