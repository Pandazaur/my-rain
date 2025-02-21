import { ReactNode } from 'react'
import { Sheet } from 'react-modal-sheet'

const HEADER_BG_CLASS = 'bg-slate-900'

type Props = {
    isOpen: boolean
    setOpen: (isNowOpen: boolean) => unknown
    title: string
    children: ReactNode
}

export default function BottomModal(props: Props) {
    return (
        <Sheet isOpen={props.isOpen} onClose={() => props.setOpen(false)} snapPoints={[0.75]}>
            <Sheet.Container>
                <Sheet.Header>
                    <div className={`rounded-t-lg h-6 flex items-center justify-center ${HEADER_BG_CLASS}`}>
                        <div className={'w-12 h-1 rounded-full bg-neutral-200/20'}></div>
                    </div>
                </Sheet.Header>
                <Sheet.Content className={'bg-slate-800 text-white'}>
                    <h2 className={`px-4 py-6 text-xl font-medium text-center ${HEADER_BG_CLASS}`}>{props.title}</h2>
                    <div className={'container mx-auto py-8 px-4'}>{props.children}</div>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    )
}
