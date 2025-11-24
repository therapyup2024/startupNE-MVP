export class EfiBankPaymentLink {
  code: number;
  data: EfiBankPaymentLinkData;
}

class EfiBankPaymentLinkData {
  charge_id: number;
  status: string; //'link';
  total: number;
  custom_id: string;
  payment_url: string;
  payment_method: string; //'all';
  billet_discount: number;
  card_discount: number;
  conditional_discount_value: number;
  conditional_discount_type: string; //'percentage';
  conditional_discount_date: string; //'2021-12-30';
  request_delivery_address: boolean;
  message: string;
  expire_at: string; //'2025-02-08';
  created_at: string; //'2021-11-09 11:14:36';
}
