<template>
  <div
    id="file-list"
    class="card"
    v-on:dragover="handleImagesDragOver"
    v-on:drop="handleImagesDrop"
  >
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="!imageList.length">
        <span>
          No images selected. Choose images by clicking the button or dragging
          them into here.
        </span>
      </li>
      <li
        class="list-group-item"
        v-else
        v-for="item in imageList"
        v-bind:key="item.index"
      >
        <div class="row align-items-center">
          <div class="col-auto">
            <div
              class="spinner-border text-primary thumb-size-sm"
              v-if="item.status == 'fetch'"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div
              class="status-icon thumb-size-sm"
              v-if="item.status == 'empty'"
              v-html="
                $octicons['image'].toSVG({
                  width: 32,
                  height: 32,
                  class: 'thumb-size'
                })
              "
            ></div>
            <img
              class="img-thumbnail object-fit-cover thumb-size-sm"
              v-show="item.status == 'pending' || item.status == 'default'"
              v-bind:src="item.path"
              v-on:load="
                updateStatus(item.index, item.file ? 'pending' : 'default')
              "
              v-on:error="updateStatus(item.index, 'empty')"
            />
          </div>
          <div class="col text-truncate">
            <span v-text="getImageText(item.index)"></span>
          </div>
          <div class="col-auto">
            <button
              class="btn-close"
              type="button"
              aria-label="Close"
              v-on:click="removeImage(item.index)"
            ></button>
          </div>
        </div>
      </li>
    </ul>
    <div class="card-body">
      <button
        class="btn btn-primary"
        type="button"
        v-bind:disabled="images.length >= max"
        v-on:click="openFileInput"
      >
        <span>Choose Images</span>
        <input
          class="d-none"
          type="file"
          multiple
          id="file-input"
          accept="image/*"
          v-on:input="handleImagesDialog"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageInput",
  props: {
    name: String,
    max: Number,
    input: Array
  },
  emits: ["commit"],
  data: function() {
    return {
      images: []
    };
  },
  beforeMount: function() {
    this.$watch(
      "input",
      function(newValue) {
        let remoteData = [];
        if (newValue && newValue.length) {
          remoteData = newValue.map(
            function(item, index) {
              let data = this.images.find(function(image) {
                return image && image.path == item;
              });
              if (data) {
                return Object.assign({}, data, { index: index });
              }
              return {
                index: index,
                path: item,
                file: null,
                status: "fetch"
              };
            }.bind(this)
          );
        }
        let localData = this.images
          .filter(function(item) {
            return item.file;
          })
          .map(function(item, index) {
            return Object.assign({}, item, {
              index: remoteData.length + index
            });
          });
        this.images = remoteData.concat(localData).filter(
          function(item, index) {
            return index < this.max;
          }.bind(this)
        );
      }.bind(this),
      { immediate: true, deep: true }
    );
  },
  methods: {
    addImages: function(fileList) {
      let mappedData = Object.values(fileList).map(
        function(file, index) {
          return {
            index: this.images.length + index,
            path: URL.createObjectURL(file),
            file: file,
            status: "fetch"
          };
        }.bind(this)
      );
      mappedData.forEach(
        function(item) {
          if (this.images.length < this.max) {
            this.images.push(item);
          }
        }.bind(this)
      );
    },
    removeImage: function(index) {
      let image = this.images.find(function(item) {
        return item && item.index == index;
      });
      if (image.file) {
        URL.revokeObjectURL(image.path);
        this.images.splice(index, 1);
        this.images = this.images.map(function(item, index) {
          return Object.assign({}, item, { index: index });
        });
      } else {
        image.status = "pending";
        this.images.splice(index, 1, image);
      }
    },
    updateStatus: function(index, status) {
      let image = this.images.find(function(item) {
        return item && item.index == index;
      });
      image.status = status;
      this.images.splice(index, 1, image);
    },
    getImageText: function(index) {
      let image = this.images.find(function(item) {
        return item && item.index == index;
      });
      if (image.status == "fetch") {
        return "Loading...";
      }
      if (image.file) {
        return image.file.name;
      }
      if (image.status == "empty") {
        return "Broken Image (Remove is advised)";
      }
      return "Uploaded Image";
    },
    openFileInput: function(event) {
      event.currentTarget.querySelector("input").click();
    },
    handleImagesDialog: function(event) {
      this.addImages(event.target.files);
      event.target.value = "";
    },
    handleImagesDragOver: function(event) {
      event.preventDefault();
    },
    handleImagesDrop: function(event) {
      event.preventDefault();
      let acceptImage = /^image\/.*/;
      let fileList = event.dataTransfer.items
        ? Array.from(event.dataTransfer.items)
            .filter(function(item) {
              return item.kind == "file" && item.type.match(acceptImage);
            })
            .map(function(item) {
              return item.getAsFile();
            })
        : Array.from(event.dataTransfer.files).filter(function(file) {
            return file.type.match(acceptImage);
          });
      this.addImages(fileList);
    },
    commitChanges: function() {
      let remoteUnstaged = this.images.filter(function(item) {
        return !item.file && item.status == "pending";
      });
      let localUnstaged = this.images.filter(function(item) {
        return item.file && item.status == "pending";
      });
      if (!remoteUnstaged.length && !localUnstaged.length) {
        this.checkCommittable();
      }
      remoteUnstaged.forEach(
        async function(item) {
          try {
            let response = await this.$api.imageDelete(item.path);
            if (response.data.success) {
              this.images.splice(item.index, 1, null);
              this.checkCommittable();
            }
          } catch (error) {
            console.error(error);
          }
        }.bind(this)
      );
      localUnstaged.forEach(
        async function(item) {
          try {
            let response = await this.$api.imageAdd(item.file);
            if (response.data.path) {
              let newData = Object.assign({}, item, {
                path: response.data.path,
                file: null,
                status: "default"
              });
              this.images.splice(item.index, 1, newData);
              this.checkCommittable();
            }
          } catch (error) {
            console.error(error);
          }
        }.bind(this)
      );
    },
    checkCommittable: function() {
      let unstagedImages = this.images.filter(function(item) {
        return item && item.status == "pending";
      });
      if (!unstagedImages.length) {
        let imagePaths = this.images
          .filter(function(item) {
            return item;
          })
          .map(function(item) {
            return item.path;
          });
        this.$emit("commit", imagePaths);
      }
    }
  },
  computed: {
    imageList: function() {
      return this.images.filter(function(item) {
        return item && (item.file || item.status != "pending");
      });
    }
  }
};
</script>
