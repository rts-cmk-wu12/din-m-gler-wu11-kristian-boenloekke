export default function Section({ children, className }) {
    return <section className={`global-padding ${className}`}>{children}</section>
}