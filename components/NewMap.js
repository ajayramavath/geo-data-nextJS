import dynamic from 'next/dynamic'

const NewMap = (props) => {

    const Mapref = dynamic(
        () => import('@/components/mapRef'), { ssr: false }
    )

    return (
        <Mapref data={props.data} />
    )
}

export default NewMap