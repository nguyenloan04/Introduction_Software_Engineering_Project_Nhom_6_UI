import {useEffect} from 'react'
import '../Homepage.css'
import {Header} from "@/components/ui/Header.jsx";
import {Footer} from "@/components/ui/Footer.jsx";
import {AllProducts} from "@/components/AllProducts.jsx";
import {SuggestProducts} from "@/components/SuggestProducts.jsx";

function HomePage() {
    const userId = 1 ;

    const handleSelectGlasses = (url) => {
        console.log('Selected glasses URL:', url);
    };

    return (
        <div>
            <Header/>
            
            <div className="list">
                <h2>Tất cả sản phẩm</h2>
                <AllProducts onSelectGlasses={handleSelectGlasses} />
            </div>
            <div className="list">
                <h2>Sản phẩm được gợi ý</h2>
                <SuggestProducts userId={userId} />
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage
