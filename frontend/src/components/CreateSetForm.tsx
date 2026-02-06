import { SetPanel } from './SetPanel';

type Props = {
  actId: string;
}

export const CreateSetForm = ({ actId }: Props) => {
  return (
    <details className="group">
      <summary className="list-none flex gap-8 items-center p-20 bg-surface rounded-md marker:content-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-18 h-18 transition-all duration-[0.15s] ease-in text-foreground-muted group-open:text-foreground group-open:rotate-45 cursor-pointer hover:opacity-60 "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>

        <p className={'font-bold text-lg text-foreground-muted group-open:text-foreground'}>CREATE SET</p>
      </summary>

      <SetPanel actId={actId} set={{ id: "", title: "", description: "" }} songs={[]} isCreateMode={true} />
    </details>
  )
}