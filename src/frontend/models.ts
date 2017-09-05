export interface IUseCase {
    name: string
    steps: IStep[]
}

export interface IStep {
    name: string
    component: JSX.Element
}
