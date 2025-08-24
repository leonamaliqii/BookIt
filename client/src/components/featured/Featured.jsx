import './featured.css';

const Featured = () => {
    return (
<div className="featured">
    <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1653684617625-c6d017d05b80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>Prishtina</h1>
            <h2>123 properties</h2>
        </div>
    </div>
    <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1580634050780-1cccfc6291e2?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>Peja</h1>
            <h2>533 properties</h2>
        </div>
</div>
    <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1501769844226-964f74b54e53?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>Gjakova</h1>
            <h2>532 properties</h2>
        </div>
    </div>
</div>
    )
}
export default Featured