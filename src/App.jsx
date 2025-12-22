import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import RecipeBook from "./components/RecipeBook";
import RecipeDetail from "./components/RecipeDetail";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import EnquiryPage from "./components/EnquiryPage";
import Footer from "./components/Footer";
import { recipesData } from "./data/recipes";
import { useCart } from "./hooks/useCart";

function App() {
  const [currentPage, setCurrentPage] = useState("recipes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const {
    cart,
    cartTotal,
    guestCount,
    parsedGuestCount,
    estimatedSavings,
    perPersonCost,
    totalItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    handleGuestCountChange,
    handleGuestCountBlur,
    setGuestCount,
  } = useCart();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page !== "recipe-detail") {
      setSelectedRecipe(null);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage("recipe-detail");
  };

  const handleAddProductToCart = (productName) => {
    // Find the product by name and add to cart
    // This would need product data integration
    console.log("Adding to cart:", productName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "recipes":
        return <RecipeBook onViewRecipe={handleViewRecipe} />;
      case "recipe-detail":
        return (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => navigateTo("recipes")}
            onAddToCart={handleAddProductToCart}
          />
        );
      case "products":
        return (
          <ProductList
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      case "cart":
        return (
          <CartPage
            cart={cart}
            guestCount={guestCount}
            parsedGuestCount={parsedGuestCount}
            cartTotal={cartTotal}
            perPersonCost={perPersonCost}
            estimatedSavings={estimatedSavings}
            handleGuestCountChange={handleGuestCountChange}
            handleGuestCountBlur={handleGuestCountBlur}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            navigateTo={navigateTo}
          />
        );
      case "enquiry":
        return (
          <EnquiryPage
            guestCount={parsedGuestCount}
            cartTotal={cartTotal}
            perPersonCost={perPersonCost}
            estimatedSavings={estimatedSavings}
            cart={cart}
            clearCart={clearCart}
            navigateTo={navigateTo}
          />
        );
      default:
        return <RecipeBook onViewRecipe={handleViewRecipe} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        currentPage={currentPage}
        navigateTo={navigateTo}
        cartCount={totalItems}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
