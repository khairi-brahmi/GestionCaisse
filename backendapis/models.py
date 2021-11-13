from django.db import models
from django.conf import settings
from django.utils import timezone



class Category(models.Model):
    '''
    Model Category : contient l'id et le nom de la catégorie comme attributs et une méthode __str__ 
    '''
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    Le Model Product pour representer le produit par nom, description, categorie, prix, date d'ajout et l'image
    """
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=50, decimal_places=2)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    date_added = models.DateField(default=timezone.now)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.name

    def get_prod_image(self):
        '''
            retourner une image par défaut dans le cas de l'abscence d'une vraie image
        '''
        if not self.image:
            return f'{settings.STATIC_URL}product.png'
        return self.image.url

class DiscountPercentage(models.Model):
    #réduction par pourcentage sur le prix
    availability=  models.DateField(default=timezone.now)
    product= models.ForeignKey(Product,unique=True, related_name="discount_percentage", on_delete=models.CASCADE)
    reduction_percentage = models.DecimalField(max_digits=50, decimal_places=2)

class DiscountOffer(models.Model):
    #offrer des produit : rédution sur la quantité
    availability= models.DateField(default=timezone.now)
    product= models.ForeignKey(Product,unique=True, related_name="discount_offer", on_delete=models.CASCADE)
    purchased_products=models.IntegerField(default=2,blank=True, null=True)
    offred_products=models.IntegerField(default=1,blank=True, null=True)

class OrderProduct(models.Model):
    #Le produit choisi pour une commande , déterminer par l'utilisateur connecté , le produit et la quantité
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


    def get_item_name(self):
        #Retourner le nom du produit choisi 
        return self.item.name

    def get_total_item_price(self):
        #Le prix total de la quantité demandée sans faire la réduction
        return self.quantity * self.item.price

    def get_discount_total_item_price(self):
        #calculer la réduction % sur la totalité de la quantité demandée
        if self.item.discount_percentage.first():
            return self.quantity * self.item.price * self.item.discount_percentage.first().reduction_percentage / 100
        else:
            return self.quantity * self.item.price

    def get_discount_total_item_quantity(self):
        #Calculer la quantité finale aprés l'ajout des offres
        if self.item.discount_offer.first():
            nbr_offers=self.quantity // self.item.discount_offer.first().purchased_products
            return self.item.discount_offer.first().offred_products * nbr_offers + self.quantity
        else:
            return self.quantity

class Order(models.Model):
    #La commande finale (les produits , l'utilisateur, le type de paiement et le prix total de la commande )
    #A améliorer
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderProduct)
    payement=models.CharField(max_length=255)

    def get_total_price(self):
        total = 0
        for item in self.items.all():
            total = total + item.get_discount_total_item_price()
        return total
