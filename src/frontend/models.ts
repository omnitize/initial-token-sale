export interface IUseCase {
    name: string
    component: JSX.Element
    steps: IStep[]
}

export interface IStep {
    name: string
    component: JSX.Element
}
