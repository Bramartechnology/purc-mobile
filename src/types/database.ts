/**
 * Tipos de TypeScript para la base de datos PURC
 *
 * Estos tipos definen la "forma" de cada tabla en Supabase.
 * TypeScript te avisa si intentás guardar un dato con el tipo incorrecto
 * (por ejemplo, poner texto donde va un número). Es como un corrector ortográfico
 * pero para la estructura de los datos.
 */

// Roles posibles en el sistema
export type UserRole = 'citizen' | 'municipal_admin' | 'municipal_crew' | 'super_admin';

// Estados posibles de un reporte
export type ReportStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'verified' | 'closed';

// Prioridades posibles
export type Priority = 'low' | 'medium' | 'high' | 'critical';

// ---- Tabla: municipalities ----
export interface Municipality {
  id: string;
  name: string;
  province: string | null;
  country: string;
  contact_email: string | null;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
}

// ---- Tabla: profiles ----
export interface Profile {
  id: string;
  municipality_id: string | null;
  full_name: string;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

// ---- Tabla: categories ----
export interface Category {
  id: string;
  municipality_id: string | null;
  name: string;
  icon: string | null;
  default_priority: Priority;
  sla_hours: number;
  is_active: boolean;
  created_at: string;
}

// ---- Tabla: companies ----
export interface Company {
  id: string;
  municipality_id: string | null;
  name: string;
  service_type: string | null;
  contact_email: string;
  sla_hours: number;
  is_active: boolean;
  created_at: string;
}

// ---- Tabla: reports ----
export interface Report {
  id: string;
  municipality_id: string;
  citizen_id: string;
  category_id: string;
  company_id: string | null;
  description: string | null;
  photo_url: string;
  location: string; // PostGIS geography — se maneja como string en el cliente
  address_text: string | null;
  status: ReportStatus;
  priority: Priority;
  upvote_count: number;
  resolution_photo_url: string | null;
  resolution_gps: string | null;
  resolution_note: string | null;
  magic_link_token: string | null;
  magic_link_expires_at: string | null;
  citizen_rating: number | null;
  citizen_feedback: string | null;
  assigned_at: string | null;
  resolved_at: string | null;
  verified_at: string | null;
  closed_at: string | null;
  created_at: string;
}

// ---- Tabla: report_upvotes ----
export interface ReportUpvote {
  id: string;
  report_id: string;
  citizen_id: string;
  created_at: string;
}

// ---- Tabla: status_history ----
export interface StatusHistory {
  id: string;
  report_id: string;
  old_status: string | null;
  new_status: ReportStatus;
  changed_by: string | null;
  note: string | null;
  created_at: string;
}

// ---- Tabla: notifications ----
export interface Notification {
  id: string;
  user_id: string;
  report_id: string | null;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

// ---- Para crear un reporte nuevo (solo los campos requeridos) ----
export interface CreateReportPayload {
  municipality_id: string;
  citizen_id: string;
  category_id: string;
  photo_url: string;
  location: string; // Formato PostGIS: ST_Point(longitud, latitud)
  description?: string;
  address_text?: string;
}
