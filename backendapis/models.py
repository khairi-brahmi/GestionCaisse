from django.db import models
from django.utils import timezone
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
class Product(models.Model):
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
        if self.image:
            return self.image.url 
        return ''

class DiscountPercentage(models.Model):
    """
  
    REDUCTION="réduction" #réduction en % par exemple - 40% sur le produit X et Y 
    OFFER="offre" # par ex: 2 produits le 3 éme gratuit 
    TYPE_CHOICES =  [
        (REDUCTION, 'réduction'), 
        (OFFER, 'offre')
    ]
      """
    #id = models.AutoField(primary_key=True)
    availability=  models.DateField(default=timezone.now)
    #type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    product= models.ForeignKey(Product,unique=True, related_name="discount_percentage", on_delete=models.CASCADE)
    reduction_percentage = models.DecimalField(max_digits=50, decimal_places=2)

class DiscountOffer(models.Model):
    """
  
    REDUCTION="réduction" #réduction en % par exemple - 40% sur le produit X et Y 
    OFFER="offre" # par ex: 2 produits le 3 éme gratuit 
    TYPE_CHOICES =  [
        (REDUCTION, 'réduction'), 
        (OFFER, 'offre')
    ]
      """
    #id = models.AutoField(primary_key=True)
    availability= models.DateField(default=timezone.now)
    #type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    product= models.ForeignKey(Product,unique=True, related_name="discount_offer", on_delete=models.CASCADE)
    purchased_products=models.IntegerField(default=2,blank=True, null=True)
    offred_products=models.IntegerField(default=1,blank=True, null=True)

class OrderProduct(models.Model):
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_discount_total_item_price(self):
        return self.quantity * self.item.price * self.item.discount_percentage.first().reduction_percentage / 100

    def get_discount_total_item_quantity(self):
        nbr_offers=self.quantity // self.item.discount_offer.first().purchased_products
        return self.item.discount_offer.first().offred_products * nbr_offers + self.quantity

class Order(models.Model):
    items = models.ManyToManyField(OrderProduct)

    def get_total_price(self):
        total = 0
        for item in self.items.all():
            total = total + item.get_discount_total_item_price()
        return total
