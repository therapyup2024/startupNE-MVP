import React, { useState } from "react";

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-2xl px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 shadow-sm">
    {children}
  </span>
);

const TimeSlot = ({ label }) => (
  <button
    type="button"
    className="rounded-xl px-3 py-1.5 text-sm bg-white border border-violet-300 hover:border-violet-400 hover:shadow transition"
  >
    {label}
  </button>
);

/** Normaliza o schedule para [{label, sublabel, times}] */
function normalizeSchedule(schedule) {
  if (Array.isArray(schedule)) return schedule;

  return Object.entries(schedule).map(([key, times]) => {
    let label = key;
    let sublabel = "";

    if (key.includes("\n")) {
      const [a, b] = key.split("\n");
      label = a?.trim() ?? "";
      sublabel = b?.trim() ?? "";
    } else if (key.includes(",")) {
      const [a, b] = key.split(",");
      label = a?.trim() ?? "";
      sublabel = b?.trim() ?? "";
    }

    return { label, sublabel, times };
  });
}

/** Modal “Veja Mais” */
function SpecialistDetailsModal({
  open,
  onClose,
  name,
  title,
  about,
  topics,
  price,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 md:p-7 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-2xl font-light leading-none"
          aria-label="Fechar detalhes"
        >
          ×
        </button>

        <h2 className="text-xl md:text-2xl font-extrabold text-violet-900 pr-8">
          {name}
        </h2>
        <p className="text-sm font-semibold text-violet-700 mt-1">{title}</p>

        <p className="mt-3 text-sm text-slate-700 leading-relaxed">{about}</p>

        {/* Bloco criativo de recomendação */}
        <div className="mt-4 bg-violet-50 rounded-2xl p-4">
          <p className="text-sm font-semibold text-violet-800 mb-1">
            Como essa profissional pode te ajudar?
          </p>
          <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
            <li>
              Construindo um espaço seguro para você falar sobre o que sente sem
              julgamentos.
            </li>
            <li>
              Ajudando a organizar pensamentos, emoções e rotina de forma mais
              leve.
            </li>
            <li>
              Desenvolvendo estratégias práticas para lidar com crises,
              ansiedade e conflitos do dia a dia.
            </li>
          </ul>
        </div>

        {/* Temáticas em destaque */}
        {topics?.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-violet-800 mb-2">
              Temáticas que ela mais atende
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-violet-100 text-violet-800 text-xs font-medium px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA de agendamento */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <button className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 transition">
            Agendar consulta agora (R$ {price})
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-violet-200 text-violet-700 text-sm font-semibold py-2.5 hover:bg-violet-50 transition"
          >
            Quero tirar uma dúvida antes
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-400 text-center">
          Essa recomendação não substitui avaliação médica. Em caso de
          emergência, procure um serviço de urgência.
        </p>
      </div>
    </div>
  );
}

export default function SpecialistCard({
  avatarUrl,
  name,
  title,
  rating = 5,
  opinions = 0,
  doc,
  address,
  price,
  teleconsulta = false,
  about,
  topics = [],
  schedule = {},
}) {
  const scheduleDays = normalizeSchedule(schedule);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-white rounded-3xl shadow-md border border-violet-50 px-6 py-6 md:px-8 md:py-7">
        {/* DUAS COLUNAS LADO A LADO */}
        <div className="flex gap-6 items-stretch flex-col lg:flex-row">
          {/* COLUNA ESQUERDA */}
          <div className="basis-2/3 min-w-0">
            <div className="flex gap-4 items-start">
              <img
                src={avatarUrl}
                alt={name}
                className="h-16 w-16 rounded-full object-cover shadow ring-2 ring-white flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-wide text-violet-700 bg-violet-100 px-2 py-1 rounded-full">
                    PERFIL NOVO
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 truncate">
                    {name}
                  </h3>
                </div>

                <p className="text-violet-800 font-semibold mt-0.5">{title}</p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <span>{"⭐".repeat(Math.min(5, rating))}</span>
                  <span>{opinions} opiniões</span>
                </div>

                <p className="text-sm text-slate-500 mt-0.5">{doc}</p>
                <p className="text-sm text-slate-500">Endereço: {address}</p>

                {teleconsulta && (
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-3 py-1 rounded-full">
                      Teleconsulta
                    </span>
                  </div>
                )}

                <p className="mt-2 text-violet-700 font-bold text-base">
                  R$ {price}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              {about}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-max rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-800 font-semibold px-4 py-2 text-sm transition"
            >
              Veja Mais →
            </button>
          </div>

          {/* COLUNA DIREITA – AGENDA */}
          <div className="basis-1/3 min-w-[260px] flex flex-col">
            <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 flex-1">
              <div className="grid grid-cols-2 gap-3">
                {scheduleDays.map(({ label, sublabel, times }, i) => (
                  <div key={`${label}-${i}`} className="text-center">
                    <div className="mb-2">
                      <p className="text-[13px] font-semibold text-slate-800 leading-tight">
                        {label}
                      </p>
                      {sublabel && (
                        <p className="text-[12px] text-slate-600 leading-tight">
                          {sublabel}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      {times.map((t, idx) =>
                        t === "—" ? (
                          <span
                            key={idx}
                            className="inline-block text-slate-400 text-sm py-1.5"
                          >
                            —
                          </span>
                        ) : (
                          <TimeSlot key={idx} label={t} />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-3">
                <button className="text-xs text-violet-700 font-medium hover:underline">
                  Mostrar mais horários
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TEMÁTICAS EM TODA A LARGURA */}
        <div className="mt-5 pt-3 border-t border-violet-50">
          <p className="text-sm font-semibold text-violet-700 mb-2">
            Temáticas
          </p>
          <div className="flex flex-wrap gap-3">
            {topics.map((t, idx) => (
              <Tag key={idx}>{t}</Tag>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL “VEJA MAIS” */}
      <SpecialistDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        title={title}
        about={about}
        topics={topics}
        price={price}
      />
    </>
  );
}
