export class CreateEfiBankPaymentLinkDto {
  items: CreateEfiBankPaymentLinkDtoItem[];

  metadata?: CreateEfiBankPaymentLinkDtoMetadata;

  customer?: CreateEfiBankPaymentLinkDtoCustomer;

  shippings?: CreateEfiBankPaymentLinkDtoShippings[];

  settings: CreateEfiBankPaymentLinkDtoSettings;
}

class CreateEfiBankPaymentLinkDtoItem {
  amount: number;
  name: string;
  value: number;
}

class CreateEfiBankPaymentLinkDtoMetadata {
  custom_id?: string;
  notification_url?: string;
}

class CreateEfiBankPaymentLinkDtoCustomer {
  email?: string;
}

class CreateEfiBankPaymentLinkDtoShippings {
  name?: string;
  value?: number;
}

class CreateEfiBankPaymentLinkDtoSettings {
  billet_discount?: number;
  card_discount?: number;
  message?: string;
  conditional_discount?: CreateEfiBankPaymentLinkDtoSettingsConditionalDiscount;
  payment_method: string; //'all';
  expire_at?: string; //'2025-02-08';
  request_delivery_address: boolean;
}

class CreateEfiBankPaymentLinkDtoSettingsConditionalDiscount {
  type?: string; //'percentage';
  value?: number;
  until_date?: string; //'2021-12-30';
}
