import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
    const { data, loading, error } = useFetch(
        "http://localhost:8800/api/hotels/countByCity?cities=Prishtine,Gjakove,Peja"
    );

    console.log("Featured data:", data);

    return (
        <div className="featured">
            {loading ? ("Loading, please wait") : (
                <>
                <div className="featuredItem">
                    <img src="https://images.unsplash.com/photo-1653684617625-c6d017d05b80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Prishtina</h1>
                        <h2>{data && data.length > 0 ? data[0] : "..."} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://images.unsplash.com/photo-1501769844226-964f74b54e53?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Gjakova</h1>
                        <h2>{data && data.length > 1 ? data[1] : "..."} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://images.unsplash.com/photo-1580634050780-1cccfc6291e2?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Peja</h1>
                        <h2>{data && data.length > 2 ? data[2] : "..."} properties</h2>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default Featured;
