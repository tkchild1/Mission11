import { useState } from "react";
import WelcomeBand from "../components/WelcomeBand";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/Booklist";
import CartSummary from "../components/CartSummary";

function BookListPage() {

    const [categories, setCategories] = useState<string[]>([]);

    return (
        <div className="container">
        <div className="welcome-band row bg-light p-4 mb-4">
            <CartSummary />
            <WelcomeBand />
        </div>
        <div className="row">
            <div className="col-md-3">
                <CategoryFilter selectedCategories={categories} onCheckBoxChange={setCategories} />
            </div>
            <div className="col-md-9">
                <BookList selectedCategories={categories} />
            </div>
        </div>
        </div>

    )
}

export default BookListPage;