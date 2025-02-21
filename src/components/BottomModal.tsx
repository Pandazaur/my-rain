import { ReactNode } from 'react'
import { Sheet } from 'react-modal-sheet'

const HEADER_BG_CLASS = 'bg-slate-900'

type Props = {
    isOpen: boolean
    setOpen: (isNowOpen: boolean) => unknown
    title: string
    children: ReactNode
    showCloseButton?: boolean
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
                <Sheet.Content className={'bg-slate-800 text-white flex flex-col'}>
                    <h2 className={`px-4 py-6 text-xl font-medium text-center ${HEADER_BG_CLASS}`}>{props.title}</h2>
                    <div className={'container mx-auto py-8 px-4 flex-1'}>{props.children}</div>
                    {props.showCloseButton && (
                        <div className={'py-6 flex items-center justify-center'}>
                            <button onClick={() => props.setOpen(false)}>Close</button>
                        </div>
                    )}
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    )
}
