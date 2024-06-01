import { User, Eye, Calendar } from '@geist-ui/icons'
import { format } from "date-fns"

interface ContentDetailsProps {
    date: string
}

export const ContentDetails = ({ date }: ContentDetailsProps) => {
    const formattedDate = format(new Date(date).toDateString(), 'PPP')

    return (
        <div className="font-semibold flex items-center justify-around gap-5 bg-gradient-primary py-2 px-5 rounded-full t text-lg my-10">
            <p className="!text-zinc-900 flex items-center gap-2">
                <User size={20} strokeWidth={2.5} />
                Anav Chand
            </p>
            <p className="!text-zinc-900 flex items-center gap-2">
                <Eye size={20} strokeWidth={2.5} />
                3000
            </p>
            <p className="!text-zinc-900 flex items-center gap-2">
                <Calendar size={20} strokeWidth={2.5} />
                {formattedDate}
            </p>
        </div>
    )
}
