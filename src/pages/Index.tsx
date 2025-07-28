import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import Home from './Home';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Премиум наушники', price: 15000, category: 'Электроника', brand: 'TechBrand', image: '/img/d9517331-8597-4d5a-983f-986f137cede8.jpg', description: 'Высококачественные беспроводные наушники' },
  { id: 2, name: 'Элегантные часы', price: 25000, category: 'Аксессуары', brand: 'LuxWatch', image: '/img/e6678034-03a8-47dc-87b1-6f3923356240.jpg', description: 'Роскошные наручные часы из стали' },
  { id: 3, name: 'Современная лампа', price: 8000, category: 'Дом', brand: 'DesignHome', image: '/img/87afc5f4-7b31-4f59-92f1-c6796b357029.jpg', description: 'Минималистичная настольная лампа' },
  { id: 4, name: 'Беспроводная мышь', price: 3500, category: 'Электроника', brand: 'TechBrand', image: '/img/d9517331-8597-4d5a-983f-986f137cede8.jpg', description: 'Эргономичная компьютерная мышь' },
  { id: 5, name: 'Кожаный кошелек', price: 4500, category: 'Аксессуары', brand: 'LeatherCraft', image: '/img/e6678034-03a8-47dc-87b1-6f3923356240.jpg', description: 'Классический кожаный кошелек' },
  { id: 6, name: 'Ароматическая свеча', price: 1200, category: 'Дом', brand: 'DesignHome', image: '/img/87afc5f4-7b31-4f59-92f1-c6796b357029.jpg', description: 'Свеча с натуральными маслами' }
];

const categories = ['Все', 'Электроника', 'Аксессуары', 'Дом'];
const brands = ['Все', 'TechBrand', 'LuxWatch', 'DesignHome', 'LeatherCraft'];

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (currentView === 'home') {
    return <Home onNavigateToCatalog={() => setCurrentView('catalog')} />;
  }

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'Все' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedBrand, priceRange]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">МАГАЗИН</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={12} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <span>Итого:</span>
                        <span>{cartTotal.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Категория</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Бренд</h3>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Цена</h3>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000}
                      step={500}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0].toLocaleString()} ₽</span>
                      <span>{priceRange[1].toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Все');
                    setSelectedBrand('Все');
                    setPriceRange([0, 30000]);
                    setSearchTerm('');
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Каталог товаров ({filteredProducts.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <section className="mt-16 py-12 border-t">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Контакты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <Icon name="Phone" size={20} className="mx-auto text-muted-foreground" />
                <p className="font-medium">Телефон</p>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
              <div className="space-y-2">
                <Icon name="Mail" size={20} className="mx-auto text-muted-foreground" />
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">info@shop.com</p>
              </div>
              <div className="space-y-2">
                <Icon name="MapPin" size={20} className="mx-auto text-muted-foreground" />
                <p className="font-medium">Адрес</p>
                <p className="text-muted-foreground">Москва, ул. Примерная, 123</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}