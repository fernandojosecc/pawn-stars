import { SeasonStatus } from '@pawn-stars/shared-types'

const config: Record<SeasonStatus, { label: string; classes: string }> = {
  [SeasonStatus.ACTIVE]:    { label: 'Active',    classes: 'bg-success-100 text-success-800' },
  [SeasonStatus.COMPLETED]: { label: 'Completed', classes: 'bg-accent-100  text-accent-800'  },
  [SeasonStatus.UPCOMING]:  { label: 'Upcoming',  classes: 'bg-primary-100 text-primary-800' },
}

export function SeasonStatusBadge({ status }: { status: SeasonStatus }) {
  const { label, classes } = config[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  )
}
