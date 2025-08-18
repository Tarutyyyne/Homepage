type Props = { params: { slug: string } };

export default function WorksDetail({ params }: Props) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Works: {params.slug}</h1>
      <p className="mt-2 text-gray-600">
        作品詳細ページのプレースホルダーです。
      </p>
    </main>
  );
}
