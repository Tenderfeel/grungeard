import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import type {
  DeadlyAssultEnemy,
  Lang,
} from "@submodule/zzz-wiki-scrap/src/types";

export default function EnemyDetailCard({
  enemyData,
  lang,
}: {
  enemyData: DeadlyAssultEnemy;
  lang: Lang;
}) {
  console.log(enemyData);
  return (
    <Stack direction="row" gap={1} p={2}>
      <Image
        src="/assets/images/enemies/defiler.webp"
        width={100}
        height={138}
        alt=""
      />
      <Stack gap={1}>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography variant="body2" color="textSecondary">
            弱点属性
          </Typography>

          <Stack direction="row">
            {enemyData.weaknesses.map((weakness, index) => {
              return (
                <Image
                  key={index}
                  src={`/assets/images/stats/${weakness}.png`}
                  width={24}
                  height={24}
                  alt={weakness}
                />
              );
            })}
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography variant="body2" color="textSecondary">
            耐性属性
          </Typography>

          <Stack direction="row">
            {enemyData.resistances.map((resistance, index) => {
              return (
                <Image
                  key={index}
                  src={`/assets/images/stats/${resistance}.png`}
                  width={24}
                  height={24}
                  alt={resistance}
                />
              );
            })}
          </Stack>
        </Stack>

        <Paper
          sx={{ maxHeight: 74, overflowY: "auto", overflowX: "hidden" }}
          variant="outlined"
          elevation={0}
        >
          {enemyData.detail[lang] && (
            <Stack component="ul" sx={{ pl: 3, m: 0, lineHeight: 1.3 }}>
              {enemyData.detail[lang].map((detail, index) => {
                return (
                  <Box component="li" key={index}>
                    <Typography variant="caption">{detail}</Typography>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
}
