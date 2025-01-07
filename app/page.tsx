
export default async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  return (
    <div className="h-full flex flex-col items-center">
      Home Page
    </div>
  )
}