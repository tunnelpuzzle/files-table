<template>
  <div class="files-table-container">
    <div class="header-content">
      <BaseCheckbox
        v-model="selectAllCheckboxValue"
        label="Select All"
        :showLabel="false"
        id="checkbox-all"
        class="select-all-checkbox"
      />
      <FilesTableSelectedText :count="selectedFiles.length" />
      <BaseButton class="download-btn" @click="openDownloadAlert">
        <BaseIcon icon="download" class="download-icon" :label="null" />
        Download Selected
      </BaseButton>
    </div>

    <table class="files-table">
      <thead>
        <tr class="files-table-head">
          <th class="checkbox-column"><span class="sr-only">Checkbox</span></th>
          <th class="name-column">Name</th>
          <th class="device-column">Device</th>
          <th class="path-column">Path</th>
          <th class="status-icon-column"><span class="sr-only">Status Icon</span></th>
          <th class="status-column">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="item.id"
          v-for="item of tableData"
          @click="rowClicked(item)"
          class="files-table-row"
          :class="{ 'selected-row': item.selected === true }"
        >
          <td class="checkbox-column">
            <BaseCheckbox
              v-model="item.selected"
              label="Select Row"
              :id="`checkbox-${item.id}`"
              :showLabel="false"
              class="row-checkbox"
            />
          </td>
          <td class="name-column">{{ item.name }}</td>
          <td class="device-column">{{ item.device }}</td>
          <td class="path-column">{{ item.path }}</td>
          <td class="status-icon-column">
            <BaseIcon
              v-if="item.status === 'available'"
              icon="available"
              class="available-icon"
              label="Available Icon"
            />
          </td>
          <td class="status-column">
            <span>{{ statusAliasLookup.get(item.status) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { listFileMetadata } from '@/api/fileMetadataApi';
import type { TableFileMetadata } from '@/models/fileMetadata';
import { computed, reactive } from 'vue';
import FilesTableSelectedText from '@/components/filesTable/FilesTableSelectedText.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';

const statusAliasLookup = new Map([
  ['available', 'Available'],
  ['scheduled', 'Scheduled']
]);

const tableData: Array<TableFileMetadata> = reactive(
  listFileMetadata().map((file, index) => ({ ...file, id: index, selected: false }))
);

const selectedFiles = computed(() => {
  return tableData.filter((row) => row.selected === true);
});

const selectAllCheckboxValue = computed({
  get() {
    if (selectedFiles.value.length === 0) {
      return false;
    } else if (tableData.length === selectedFiles.value.length) {
      return true;
    } else {
      return null;
    }
  },
  set() {
    if (selectAllCheckboxValue.value === true) {
      setAllRowsSelected(false);
    } else {
      setAllRowsSelected(true);
    }
  }
});

function setAllRowsSelected(selected: boolean): void {
  for (const row of tableData) {
    row.selected = selected;
  }
}

function rowClicked(row: TableFileMetadata): void {
  row.selected = !row.selected;
}

function openDownloadAlert(): void {
  const availableRows = selectedFiles.value.filter((row) => row.status === 'available');
  const unavailableRows = selectedFiles.value.filter((row) => row.status !== 'available');

  let message = '';
  if (selectedFiles.value.length === 0) {
    message = 'No files selected.';
  } else {
    if (availableRows.length > 0) {
      message = 'Downloaded Files:\n';

      for (const row of availableRows) {
        message += `${row.device} ${row.path}\n`;
      }
    }

    if (unavailableRows.length === 1) {
      message += `${unavailableRows.length} file is unavailable to be downloaded.`;
    } else if (unavailableRows.length > 1) {
      message += `${unavailableRows.length} files are unavailable to be downloaded.`;
    }
  }

  // Use alert per requirements. A modal or similar may be more user friendly
  alert(message);
}
</script>

<style lang="scss" scoped>
.files-table-container {
  margin: 2rem;
}

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;

  :deep(.select-all-checkbox) {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
  }

  .download-icon {
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: bottom;
  }
}

.files-table {
  table-layout: fixed;
  border-collapse: collapse;
  border-left: $border-1;
  border-right: $border-1;

  // Table Rows
  .files-table-head {
    border-top: $border-1;
    border-bottom: $border-1;
    text-align: left;
    height: 2.5rem;
    font-size: 18px;
  }

  .files-table-row {
    border-bottom: $border-1;
    font-size: 15px;
    height: 2rem;
    cursor: pointer;

    &.selected-row {
      // Use blue for selected rows instead of gray to better distinguish hover vs. selected rows
      background-color: $select-color;
    }

    &:hover {
      background-color: $hover-color;
    }

    &.selected-row:hover {
      background-color: $hover-select-color;
    }
  }

  :deep(.row-checkbox) {
    margin-left: 0.25rem;
  }
  .available-icon {
    width: 1rem;
    height: 1rem;
    vertical-align: bottom;
    margin-bottom: 0.25rem;
  }

  // Table Columns
  .checkbox-column {
    width: 5%;
  }
  .name-column {
    width: 15%;
  }
  .device-column {
    width: 15%;
  }
  .path-column {
    width: 45%;
  }
  .status-icon-column {
    text-align: right;
  }
  .status-column {
    width: 15%;
  }
}
</style>
