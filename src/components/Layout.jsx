export default function Layout({ children }) {
    return (
        <div className="mainContainer">
            <div className="sidebar">
                
            </div>
            <div className="postsContainer">
                {children} 
            </div>
        </div>
    );
}