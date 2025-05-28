import WorkspaceProvider from "./provider"

const WorkspaceLayout = ({children} : Readonly<{children: React.ReactNode;}>) => {
  return (
    <WorkspaceProvider>
        {children}
    </WorkspaceProvider>
  )
}

export default WorkspaceLayout