import { Container } from "@/components/container"

export default function ContentLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="mx-auto w-3/5 pt-32">
            {children}
        </main>
    )
}
