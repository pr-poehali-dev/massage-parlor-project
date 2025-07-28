import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Home({ onNavigateToCatalog }: { onNavigateToCatalog: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const featuredProducts = [
    { id: 1, name: 'Премиум наушники', price: 15000, image: '/img/d9517331-8597-4d5a-983f-986f137cede8.jpg' },
    { id: 2, name: 'Элегантные часы', price: 25000, image: '/img/e6678034-03a8-47dc-87b1-6f3923356240.jpg' },
    { id: 3, name: 'Современная лампа', price: 8000, image: '/img/87afc5f4-7b31-4f59-92f1-c6796b357029.jpg' }
  ];

  const benefits = [
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставим ваш заказ в течение 24 часов по Москве'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'Все товары проходят строгий контроль качества'
    },
    {
      icon: 'CreditCard',
      title: 'Удобная оплата',
      description: 'Принимаем все виды карт и электронные платежи'
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Наша служба поддержки работает круглосуточно'
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold cursor-pointer">
            МАГАЗИН
          </h1>
          
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={onNavigateToCatalog}
            >
              Каталог
            </button>
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>

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
              <div className="mt-6">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Итого:</span>
                      <span>{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/98601bef-8b06-47df-b275-c72a3f6d0eae.jpg" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            ПРЕМИУМ КАЧЕСТВО
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Откройте для себя коллекцию товаров высочайшего качества
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => setCurrentView('catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Популярные товары</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Самые востребованные товары из нашей коллекции
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <Button className="w-full">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы обеспечиваем лучший сервис и качество для наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={benefit.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы сделать покупку?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-6"
            onClick={() => setCurrentView('catalog')}
          >
            Перейти в каталог
            <Icon name="ShoppingBag" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">МАГАЗИН</h3>
              <p className="text-muted-foreground text-sm">
                Премиум товары высочайшего качества для вашего комфорта и стиля жизни.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2 text-sm">
                <button 
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setCurrentView('home')}
                >
                  Главная
                </button>
                <button 
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={onNavigateToCatalog}
                >
                  Каталог
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@shop.com</p>
                <p>Москва, ул. Примерная, 123</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 МАГАЗИН. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

